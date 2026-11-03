---
sidebar_label: "About"
sidebar_position: 3
---

# About This Manual

Writing documentation is hard.

Not only in writing it well, but also in keeping it up-to-date. It's also hard to keep track of all the changes made in software, and when you're creating the software, creating the documentation is a huge undertaking in it's own right.

In my opinion, Bidule suffers from not having a good pedegogical resource. This is of particular importance for new users, many of whom are not experienced with Bidule, let alone DSP, MIDI or visual programming in general.

In short, it can be a make or break moment for someone to get started with Bidule, because when you hit a wall immediately, with no helpful doors to open, it's a show-stopper. This might lead to new users giving up on Bidule and try one of the other visual programming platforms (Pure Data, Max, etc.) that arguably offer much better documentation, but equally a much steeper learning curve and up front complexity. Some people love the complexity, but Bidule I've find is the right balance of complexity and actually making meaningful sound and music.

That is not to say there is no complexity; that's available through building blocks and the sdk, should you desire it.

This manual was created to help plug the gap, in the hope that other experienced users of Bidule will contribute to make it a better resource. Think of it as a love-letter for all those years of invaluable usefulness, sound design and music creation it's provided to its long-time users. It doesn't get enough due credit.

In fact there is an official manual. You can find it [here](https://plogue.com/bidule-manual). But it has fallen behind that many updates that have be contributed to Bidule, and in need of an update. This aims to be be stop gap, using a platform that is easier to maintain and update, and accessible for contributors.

Also, think of this as an open source project. I hope other users find it useful, but jump in and contribute, which goes back to the first line of this section. Crowdsourcing is a great way to get things done. All of this by myself would take a lot of time.

## About Plogue Bidule

It is a standalone visual programming environment. It is a standalone application, and also a VST/VST3/AU plugin running in a host application. It runs on both Mac and Windows.

It ships many useful objects (actually called bidules in Plogue's parlance, which I believe means "thingie" in Quebecois French) that help you fix shortcomings or enable you to achieve soemthing that your DAW makes very challenging to achieve. You can combine these bidules into groups, and group these groups into more complicated setups. You can map parameters to anything. Modular, remember?

A lot of film & video game composers use Bidule to manage their huge multi-plugin setups that is cumbersome in DAWs...

1. So, Bidule is also a very flexible plugin-host. Bidule is problem solver.

2. Bidules is a low-level DSP toolbox. Oscillators, filters, maths & logic, spectral processing, routing, MIDI, etc. It's a toolbox for making cool stuff. With this you can make delay-based effects (reverbs, echos, chorus, granular etc), intruments (wavetable, subtractive, additive, sample-based etc), sequencers (step, algorithmic, euclidean etc) and more.

3. Bidule has OSC protocol support, which allows you to control Bidule from other applications, or control other applications from Bidule. But it can [control itself](./concepts/open-sound-control.md) too, which is another level.

4. Bidule has an SDK for developing custom audio, midi and spectral plugins, if you want to go lower still. I even use it as an environment to test my own plugins.

It would be fair to say that a lot of folk only use Bidule for the first point.

This manual is mainly focused on the last two points. These need more clarity: on the inputs and outputs, what parameters and values the objects require to even do anything.

## Disclaimer

This documentation website is a user-created initiative. It is in no way affiliated with [Plogue](https://plogue.com/). The words "Bidule" and "Plogue" are trademarks of [Plogue](https://plogue.com/). The words and views reflective in no way represent the views of Plogue.

The content here is community contributed by [boonier](https://github.com/boonier) (a long-time Bidule user) and other contributors.

## Credits

- [Plogue](https://plogue.com/) the team based in Montreal whom created and maintain Bidule. Also check out their other amazing products.
- [Docusaurus](https://docusaurus.io/) for the documentation platform
