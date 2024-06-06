---
order: 1
next: 02.md
title: Introduction
author: Charles Hu
---

## Introduction <a name="intro"></a>

HDF Converters is a custom data normalization tool for transforming exported data from various security tool formats into the [Heimdall Data Format (HDF)](https://saf.mitre.org/#/normalize). It is currently integrated into [Heimdall2](https://github.com/mitre/heimdall2) and the [SAF CLI](https://github.com/mitre/saf), which collectively are part of the [Security Automation Framework (SAF)](https://saf.mitre.org/#/), a set of tools and processes which aim to standardize and ease security compliance and testing within an automated build pipeline.

Mappers are frameworks that allow the underlying conversion infrastructure to correlate certain objects or values from one overarching object or file to another overarching object or file. In the case of HDF Converters, these mappers allow for the conversion of some security service formats to HDF (\*-to-HDF) and vice-versa (HDF-to-\*) using the tools provided by the existing conversion infrastructure.

The process for creating a mapper for HDF Converters is detailed below. In order to ensure that the created mapper produces a HDF file that is both accurate and detailed, <b>it is important that you provide as much information as possible for prototyping and understand the full (or general) schema of your security export for comprehensive information conversion.</b>
