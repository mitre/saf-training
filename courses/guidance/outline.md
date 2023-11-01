Outline of the course.

1. Overview and Objectives
2. General Concept background for security guidance
    - Definition of the term (what are we making here?)
    - Common sources of guidance (CIS Benchmarks and STIGs etc)
        - remember to point out that even though this class is mostly based on STIG creation, there are other sources of guidance in common use, i.e. Vulcan is not just STIGs
    - Tailored baselines (org-specific policies that require change to the baseline STIG)
    - What to look for in making quality guidance (should be specific, cite upstream requirements, be easy to automate if possible, etc.)
3. STIG background info
    - What's a STIG? What's DISA? What's an SRG? What's the relationship between them?
    - What's the process for traditional STIG creation? Why is that process slow (i.e. why do we need Vulcan?)
    - How do I access STIG content? --> public.cyber.mil/stigs
    - What do I do if there is no STIG?!? --> you still need to comply with the SRG to be accredited, so you should create STIG-ready content in Vulcan
    - ATO basics for government projects and why we want to use Vulcan to make easily-automatable content to support Continuous ATO
    - note that a "STIG" is only a STIG when it is peer reviewed and published by DISA. what we are making is "STIG-ready content," technically
        - HOWEVER, reiterate that you are REQUIRED to comply with the overall SRG for each of your software components if you want to deploy software for DoD. Using Vulcan to create tailored STIG-ready content for your system is still the best way to do that. Ergo there is value in using Vulcan even if you have no intention of publishing what you wrote for other people.
4. Creating a project in vulcan
    - log into the test instance
    - have each student create a project -- have them walk through making STIG-ready content for RHEL9
    - Discussion of roles and what they do in each project (viewer/author/reviewer/admin)
5. Creating a component
    - Discuss picking the relevant SRG
    - Discuss overall goals and requirements sources for your guidance
    - walktrough on creating a new component
6. Process for editing components
    - i.e. distilling a STIG out of our SRG
    - Discuss requirement applicability options -- configurable/inherently meets/inherently does not meet/not applicable and what they mean
    - discuss all the fields for a requirement that you need to fill out for each status (justifications and artifacts vs. check and fix text)
    - STIG language -- how to write check and fix text to be clear and precise, be specific about "this is a finding" statements, account for caveats and differing deployment strategies
    - Pick 3 or 4 SRG controls that we will create full STIG controls for
        - use the actual published RHEL9 STIG as an answer key when we are done
7. Creating InSpec tests from our guidance
    - walkthrough of where to write the describe blocks and how to create the full InSpec controls
    - clarify WHY we want to do this here -- why we need a tight binding between the human-readable guidance and the machine-readable automation code, e.g. "bake the pedigree into the tests so you dont lose it and always know why you are running a check"
8. Process for reviewing components
    - mark as reviewed, etc.
    - have students walk through reviewing and approving each other's controls
9. Exporting and Iterating on your content
    - have students export the XCCDF file, InSpec profile etc.
    - discussion of STIG releases, and how Vulcan lets you just duplicate a component and iterate on it easily
    - Diff viewer
    - Run your fancy new InSpec controls against a local RHEL9 container. . .? (how to get it into codebase env after they're done writing it?)
10. Formalizing the STIG
    - All the stuff related to actually working with DISA to formalize and publish the STIG-ready content you wrote
    - Vendor Intent Process
11. Recap
    - tell them what you told them -- this stuff is time-consuming but not difficult, Vulcan aims to speed it up as much as we can
    - the ATO environment we are moving into will REQUIRE you to produce well-documented, robust security guidance for any software you want to deploy for the government. Know how to do this now!