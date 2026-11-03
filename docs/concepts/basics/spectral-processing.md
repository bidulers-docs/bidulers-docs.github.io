---
sidebar_label: "What is Spectral Processing?"
sidebar_position: 1
---

# Spectral Processing

## What is it?

Spectral processing is the process of analysing a signal from the **time domain**, converting it to the **frequency domain**, manipulating it, and then converting it back to the **time domain**.

All sorts of things can be done to a signal in the frequency domain, and often not concerned with making noise, but with analysis.

But in Bidule, we what to use it to make cool sounds and effects.

## How does it work in Bidule?

`adc => [FFT] ~ stuff happens ~ [iFFT] => dac`

The above bidules connected as such convert a signal from the time domain, to the frequency domain, and back to the time domain.

When the signal passes through the FFT object, the signal is splitted up into its component frequencies and amplitudes.

When the time domain audio signal passes through the FFT object, it is analysed and sectioned up abd organised into into its component frequencies and amplitudes. These are called "bins".

The number of bins, or the size of the FFT is measured in samples (256, 512, 1024 etc). The higher the number of bins, the more detailed the analysis is, and the more _accurate_ the results will be

Where the "stuff happens" is the processing done on the frequency domain signal.
