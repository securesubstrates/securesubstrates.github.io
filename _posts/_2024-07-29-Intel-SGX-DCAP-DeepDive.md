---
date: 2024-07-28
title: Intel SGX DCAP Deep Dive
author_staff_member: yswami
name : Yogesh Swami
---

In cryptography, transparency is a virtue. Sadly, when it comes to Intel
SGX remote attestation, transparency is sorely lacking. In the
beginning, Intel chose EPID signatures as the attestation mechanism---a
fine, privacy-preserving, choice---but for reasons unknown, they chose
to [encrypt EPID signatures](https://eprint.iacr.org/2017/736.pdf)---making independent attestation verification impossible!

More recently, Intel has added support for Data Center Attestation
Primitives (DCAP) that generates ECDSA signatures. While this is a major
improvement over encrypted EPID blobs, the exact details about what is
signed, and what needs to be verified are still under specified. In
fact, instead of providing a security analysis document for
cryptographers to analyze, Intel has created a functional software API
document that does little to inspire trust in the _cryptographic_ design
of the system.

This deep dive is an attempt at understanding the end-to-end
cryptographic protocol of the DCAP attestation process. Its based on the
functional [API
documentation](https://download.01.org/intel-sgx/latest/dcap-latest/linux/docs/Intel_SGX_ECDSA_QuoteLibReference_DCAP_API.pdf)
provided by Intel as well as reverse engineering Intel provided enclaves
in Ghidra[^1]. (Details about reverse engineering is omitted on
purpose.)

### Local Attestation


### DCAP Entities and Messages

### DCAP Trust Chain

### DCAP Quote Generation and Verification

[^1]: Although DCAP [source
    code](https://github.com/intel/SGXDataCenterAttestationPrimitives)
    is available for analysis, we chose not to depend on them! We firmly
    believe that when it comes to _code signed_ software, one should
    only trust the official binary that was eventually signed, not the
    source code that may or may not have been used to generate the
    binary.