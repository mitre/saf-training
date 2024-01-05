<template><div><p>Try writing your own resources and think about how you could implement them in a profile!</p>
<p><strong>Suggested Resources to start on (Simple):</strong></p>
<ul>
<li>Docker
<ul>
<li><code v-pre>id</code> retrieves container id</li>
<li><code v-pre>image</code> retrieves image name</li>
<li><code v-pre>repo</code> retrieves the repo</li>
<li><code v-pre>tag</code> retrieves the tag</li>
<li><code v-pre>ports</code> retrieves the ports</li>
<li><code v-pre>command</code> retrieves command</li>
</ul>
</li>
<li>Git
<ul>
<li><code v-pre>branches</code> checks if branch exists</li>
<li><code v-pre>current_branch</code> retrieves current branch</li>
<li><code v-pre>last_commit</code> retrieves last commit from log</li>
<li><code v-pre>git_log</code> retrieve log of all commits</li>
<li><code v-pre>tag</code> retrieve tag for repo</li>
</ul>
</li>
</ul>
<p><strong>Suggested Resources to start on (Medium):</strong></p>
<ul>
<li>File resource
<ul>
<li><code v-pre>owner</code> tests if the owner of the file matches the specified value.</li>
<li><code v-pre>group</code> tests if the group to which a file belongs matches the specified value.</li>
<li><code v-pre>size</code> tests if a file’s size matches, is greater than, or is less than the specified value.</li>
<li><code v-pre>contents</code> tests if contents in the file match the value specified in a regular expression.</li>
<li><code v-pre>path</code> retrieves path to file</li>
</ul>
</li>
<li>Directory resource
<ul>
<li><code v-pre>owner</code> tests if the owner of the file matches the specified value.</li>
<li><code v-pre>group</code> tests if the group to which a file belongs matches the specified value.</li>
<li><code v-pre>size</code> tests if a file’s size matches, is greater than, or is less than the specified value.</li>
<li><code v-pre>contents</code> tests if contents in the file match the value specified in a regular expression.</li>
<li><code v-pre>path</code> retrieves path to directory</li>
</ul>
</li>
<li>Users
<ul>
<li><code v-pre>exist</code> tests if the named user exists</li>
<li><code v-pre>gid</code> tests the group identifier</li>
<li><code v-pre>group</code> tests the group to which the user belongs</li>
<li><code v-pre>groups</code> tests two (or more) groups to which the user belongs</li>
<li><code v-pre>home</code> tests the home directory path for the user</li>
<li><code v-pre>maxdays</code> tests the maximum number of days between password changes</li>
<li><code v-pre>mindays</code> tests the minimum number of days between password changes</li>
<li><code v-pre>shell</code> tests the path to the default shell for the user</li>
<li><code v-pre>uid</code> tests the user identifier</li>
<li><code v-pre>warndays</code> tests the number of days a user is warned before a password must be changed</li>
</ul>
</li>
<li>etc host allow/deny
<ul>
<li><code v-pre>daemon</code> daemon returns a string containing the daemon that is allowed in the rule.</li>
<li><code v-pre>client_list</code> client_list returns a 2d string array where each entry contains the clients specified for the rule.</li>
<li><code v-pre>options</code> options returns a 2d string array where each entry contains any options specified for the rule.</li>
</ul>
</li>
</ul>
<p><strong>Suggested Resources to start on (Hard):</strong></p>
<ul>
<li>etc shadow
<ul>
<li><code v-pre>users</code> A list of strings, representing the usernames matched by the filter</li>
<li><code v-pre>passwords</code> A list of strings, representing the encrypted password strings for entries matched by the where filter. Each string may not be an encrypted password, but rather a * or similar which indicates that direct logins are not allowed.</li>
<li><code v-pre>last_changes</code> A list of integers, indicating the number of days since Jan 1 1970 since the password for each matching entry was changed.</li>
<li><code v-pre>min_days</code> A list of integers reflecting the minimum number of days a password must exist, before it may be changed, for the users that matched the filter.</li>
<li><code v-pre>max_days</code> A list of integers reflecting the maximum number of days after which the password must be changed for each user matching the filter.</li>
<li><code v-pre>warn_days</code> A list of integers reflecting the number of days a user is warned about an expiring password for each user matching the filter.</li>
<li><code v-pre>inactive_days</code> A list of integers reflecting the number of days a user must be inactive before the user account is disabled for each user matching the filter.</li>
<li><code v-pre>expiry_dates</code> A list of integers reflecting the number of days since Jan 1 1970 that a user account has been disabled, for each user matching the filter. Value is nil if the account has not expired.</li>
<li><code v-pre>count</code> The count property tests the number of records that the filter matched.</li>
</ul>
</li>
<li>etc fstab
<ul>
<li><code v-pre>device_name</code> is the name associated with the device.</li>
<li><code v-pre>mount_point</code> is the directory at which the file system is configured to be mounted.</li>
<li><code v-pre>file_system_type</code> is the type of file system of the device or partition.</li>
<li><code v-pre>mount_options</code> is the options for the device or partition.</li>
<li><code v-pre>dump_options</code> is a number used by dump to decide if a file system should be backed up.</li>
<li><code v-pre>file_system_options</code> is a number that specifies the order the file system should be checked.</li>
</ul>
</li>
<li>Tomcat server conf reader
<ul>
<li><code v-pre>parse_conf</code> parse the conf file</li>
<li><code v-pre>fetch_connectors</code> retrieves keys <code v-pre>port</code>, <code v-pre>protocol</code>, <code v-pre>timeout</code>, <code v-pre>redirect</code>, <code v-pre>sslprotocol</code>, <code v-pre>scheme</code>, <code v-pre>sslenable</code>, <code v-pre>clientauth</code>, <code v-pre>secure</code></li>
</ul>
</li>
</ul>
</div></template>


