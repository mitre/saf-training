User Manual for Vulcan 
(to create a STIG for an app that does not have one)

This guide assumes that the user is loged into the website: vulcan.mitre.org

1. At the top of the page, click the "SRGs" button.
<img width="722" alt="Screenshot 2023-10-06 at 3 16 54 PM" src="https://github.com/mitre/saf-training/assets/79539195/dc332d16-1438-4409-aebb-524a182d0ef1">

You'll need to decide which high level guidance you want to base your STIG off of. Or you can upload your own, as long as it's in XCCDF format or an XML document.
Note: For this manual, the "Application_Security_Development_STIG" is going to be chosen.

2. At the top of the page, click the "Start New Project" button. 
<img width="1482" alt="Screenshot 2023-10-06 at 12 23 09 PM" src="https://github.com/mitre/saf-training/assets/79539195/6c6b58d8-8aac-4465-8cf1-61c3db81c35d">

Name your project, give it a description, and choose the visibility.
Optional: Once your project has been created, there's a tab titled "Members" where you can add users to your project, and assign them a role.

3. Go to the "Components" tab on the page, if you're not already there, and click "Create a New Component"
Here, you'll select the SRG of your choice, name the component, enter the version and release, a STIG ID Prefix, and a title. 

Optional: You can also enter a description, a PoC, and a Slack Channel ID if you want.

Click "Create Component" once you're done.
<img width="499" alt="Screenshot 2023-10-06 at 12 33 24 PM" src="https://github.com/mitre/saf-training/assets/79539195/0300aef6-ac0d-4e00-944b-62a5f2397bb0">

4. After the component has been created, click the "Open Component" button.
<img width="720" alt="Screenshot 2023-10-06 at 12 41 16 PM" src="https://github.com/mitre/saf-training/assets/79539195/d6e06163-fb6a-45db-89f9-a0efb06dc006">

The page should look something like this:
<img width="1246" alt="Screenshot 2023-10-06 at 12 45 55 PM" src="https://github.com/mitre/saf-training/assets/79539195/83442c97-7f36-4d71-b4e3-255e19f422cf">

4a. On the left side of the page, scroll down a little, and there is a section titled "All Controls". These are all of the controls in the SRG chosen, and you can tailor them for your application. 
<img width="754" alt="Screenshot 2023-10-06 at 3 28 25 PM" src="https://github.com/mitre/saf-training/assets/79539195/c470c91d-5d8b-4863-a8a7-89e1e6c2ec18">

5. If you want to make any changes/edits to the controls, click the "Edit Component Control" button at the top. For each control, its status can be updated (maybe write them out and define them? yt vid ts: 24:26)
WRITE IT OUT

6. Next, for the controls that are applicable, you can click the tab that says "InSpec Control Body" and write an automated validation test for the control.
<img width="904" alt="Screenshot 2023-10-06 at 2 20 48 PM" src="https://github.com/mitre/saf-training/assets/79539195/e8b45b26-96f4-4a69-bfa3-bd6d356b2939">

As an example, control MYCO-00-00001 requires that the application must limit the number if logon sessions per user. The test written in the example will parse through a file called "session.conf" and make sure that the max_logon_sessions variable/input is set to a value. In this example, it is set to 5.

7. Once you are done with writing a test, be sure to click the "Save Control" button at the top.
You can also see that the control changes were saved by looking on the right side of the page, under "Revision History". To see the entire control, with the documentation and InSpec test, click the tab that says "InSpec Control (Read Only)"

Other important things to note:
