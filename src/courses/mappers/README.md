---
order: 1
next: 02.md
title: OHDF Mapper Development Class
shortTitle: OHDF Mapper Development
author: Charles Hu
---

## Overview

The purpose of this class is to provide you with the foundational knowledge needed to create data format mappers for mapping data to the [OASIS Heimdall Data Format (OHDF)](https://saf.mitre.org/framework/normalize). In the following course, you will be taught the art and science of schema translation through a combination of both guided explanations and hands-on demonstrations.

The class is split into 2 sections. The first portion will introduce you to the OHDF schema and its specificities, while the second portion will show you how to apply the OHDF schema in mappers for conversions from any security data format to OHDF (\*-to-OHDF).

### Objectives

By the end of this class, you should be able to achieve the following objectives:

- Understand the OHDF schema and its components.
- Be able to identify and break down key components of any given security tool export.
- Correlate schema fields of your security data export to schema fields in OHDF.
- Create a \*-to-OHDF mapper.
- Integrate your mapper into the [OHDF Converters](https://github.com/mitre/heimdall2/tree/master/libs/hdf-converters) library and the larger Security Automation Framework (SAF) tool suite.

:::info Mapper Examples
This course will use examples and code derived from previously developed OHDF mappers which can be [found here](https://github.com/mitre/heimdall2/tree/master/libs/hdf-converters).

You are encouraged to regularly refer back to this GitHub repository to check your understanding of OHDF mappers and see how mappers are actually developed and implemented in a production environment.
:::