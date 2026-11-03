---
sidebar_label: "What is Discrete Processing?"
sidebar_position: 2
---

# Discrete Processing

Discrete processing is an event-driven approach to signal processing.

Normally audio rate processing is done sample by sample (sample rate), but with discrete processing, the signal is sampled at a _discrete rate_. So with a buffers worth of samples (1024 or 4096 for example), a single value will be picked, meaning that no extra processing of the signal is done.

Ultimately this helps reduce CPU usage and can improve performance considerably.

## Caveats

However there are caveats, and sometimes the workaround can make things slower tyhan expected. For example, consider a logic system that should produce a value of 1 (like a Trigger bidule [link to Trigger]). As all the processing is done in 1 sample, extra steps are rewuired to flip the value back to 0. Like momentary event. At sample rate this would happen automatically at the next sample in the processing loop.

In discrete processing there is no loop, so the mechanism to flip the value back to 0 must be done manually. Think of it like a small program.
