const fs = require("fs");
const path = require("path");
const yamljs = require("yamljs");

const fromList = process.argv.includes("--from-list");
const data = fromList
  ? []
  : yamljs.parse(fs.readFileSync(path.join(__dirname, "manual_schema.yaml"), "utf8"));

// Templates
const tableInputs = `| Inlet | Values | Comments |  
| --- | --- | --- |
| tbd | tbd | tbd |`;

const tableOutputs = `| Outlet | Values | Comments |  
| --- | --- | --- |
| tbd | tbd | tbd |`;

// const genericContent = `---\nsidebar_label: "{name}"\nsidebar_position: {index}\n---\n\n# {name}\n\nThis is the description of the {name} file.\n\n## Inlets\n\n{tableInputs}\n\n## Outlets\n\n{tableOutputs}\n\n## Parameters\n\n- param1\n- param2\n- param3`;

function generateFilesAndFolders(
  data,
  currentPath = path.join(__dirname, "build")
) {
  // Clear the contents of the build folder first
  if (fs.existsSync(currentPath)) {
    fs.readdirSync(currentPath).forEach((file) => {
      const filePath = `${currentPath}/${file}`;
      fs.rmSync(filePath, { recursive: true });
    });
  }

  data.forEach((item, index) => {
    // if (index) {
    if (item.type === "folder") {
      const folderName = slugify(item.name);
      const folderPath = path.join(currentPath, folderName);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      if (item.contents) {
        generateFilesAndFolders(item.contents, folderPath); // Recursive call
        // then create the _category_.json file
        createCategoryJson(`${folderPath}/_category_.json`, item, index);
      }
    } else if (item.type === "markdown") {
      const fileName = slugify(item.name);
      const filePath = path.join(currentPath, `${fileName}.md`);
      // tailor the content

      const genericContent = `---\nsidebar_label: "{name}"\nsidebar_position: {index}\n${
        item.tag ? `tag: "${item.tag}"\n` : ""
      }---\n\n# {name}\n\n${
        item.description || "This is the description of the {name} file."
      }\n\n## Inlets\n\n{tableInputs}\n\n## Outlets\n\n{tableOutputs}\n\n## Parameters\n\n- param1\n- param2\n- param3`;
      // create the file content
      const content = genericContent
        .replace(/\{name}/g, item.name)
        .replace(/\{index}/g, index)
        .replace(/\{tableInputs}/g, tableInputs)
        .replace(/\{tableOutputs}/g, tableOutputs);

      fs.writeFileSync(filePath, content);
    }
    // }
  });
}

if (fromList) {
  generateFromList();
} else {
  generateFilesAndFolders(data);
}

function listPageName(name, folders) {
  if (/^\d+ channels?$/.test(name)) {
    return folders.at(-1) === "Terminal"
      ? `${folders.at(-2)} (Terminal)`
      : folders.at(-1);
  }
  return name
    .replace(/\s+\(separate \d+ tracks\)$/, " (separate tracks)")
    .replace(/\s+\((?:\d+ channels?|\d+ outs|\d+x\d+|\d+)\)$/, "")
    .replace(/\s+\d{2,3}$/, "");
}

function listGroups(text) {
  const groups = new Map();
  text.split(/\r?\n/).forEach((line, index) => {
    if (!line.trim() || line.trimStart().startsWith("'")) return;
    const parts = line.split("\t").map((part) => part.trim());
    if (parts.length < 2 || parts.some((part) => !part)) {
      throw new Error(`Invalid hierarchy on line ${index + 1}`);
    }
    const variant = parts.pop();
    const name = listPageName(variant, parts);
    const key = [...parts, name].join("\t");
    if (!groups.has(key)) groups.set(key, { folders: parts, name, variants: [] });
    groups.get(key).variants.push(variant);
  });
  return [...groups.values()];
}

function generateFromList() {
  const text = fs.readFileSync(path.join(__dirname, "biduleslist.txt"), "utf8");
  const root = path.join(__dirname, "..", "docs", "bidules");
  const groups = listGroups(text);
  const dryRun = process.argv.includes("--dry-run");
  const check = process.argv.includes("--check");
  let missing = 0;
  let created = 0;
  for (const [index, group] of groups.entries()) {
    let folder = root;
    for (const label of group.folders) {
      folder = path.join(folder, slugify(label));
      const category = path.join(folder, "_category_.json");
      if (!dryRun && !check) {
        fs.mkdirSync(folder, { recursive: true });
        if (!fs.existsSync(category)) {
          fs.writeFileSync(category, JSON.stringify({
            label,
            link: { type: "generated-index" },
          }, null, 2) + "\n", { flag: "wx" });
        }
      }
    }
    const file = path.join(folder, `${slugify(group.name).replace(/[\\/]/g, "-")}.md`);
    if (fs.existsSync(file)) continue;
    missing++;
    if (dryRun || check) {
      console.log(path.relative(root, file), group.variants);
      continue;
    }
    const variants = group.variants.length > 1
      ? `## Variants\n\n${group.variants.map((name) => `- ${name}`).join("\n")}\n\n`
      : "";
    const content = `---\nsidebar_label: ${JSON.stringify(group.name)}\nsidebar_position: ${index}\n---\n\n# ${group.name}\n\nThis is the description of the ${group.name} file.\n\n${variants}## Inlets\n\n${tableInputs}\n\n## Outlets\n\n${tableOutputs}\n\n## Parameters\n\n- param1\n- param2\n- param3\n`;
    fs.writeFileSync(file, content, { flag: "wx" });
    created++;
  }
  console.log(`${groups.length} grouped pages; ${missing} missing; ${created} created.`);
  if (check && missing) process.exitCode = 1;
}

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/\(|\)/g, "");
}

function createCategoryJson(filePath, folderData, index) {
  // const jsonContent = JSON.parse(folderData);
  // console.log(folderData.name);
  // console.log(filePath);
  const output = {
    label: folderData.name,
    position: index,
    link: {
      type: "generated-index",
      description: "Sblach",
    },
  };
  console.log(output);

  fs.writeFileSync(
    filePath,
    JSON.stringify({
      label: folderData.name,
      position: index,
      link: {
        type: "generated-index",
        description: "Sblach",
      },
    })
  );
}
