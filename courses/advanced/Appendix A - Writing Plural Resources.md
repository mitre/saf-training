---
index: 14
title: Appendix A - Writing Plural Resources
author: Aaron Lippold
headerDepth: 3
---

## 10. Plural Resources

You  might have noticed that many InSpec resources have a "plural" version. For example, `user` has a `users` counterpart, and `package` has `packages`.

Plural resources examine platform objects in bulk. 
For example, 

- sorting through which packages are installed on a system, or 
- which virtual machines are on a cloud provider. 
- all processes running more than an hour, or all VMs on a particular subnet.

Plural resources usually include functions to query the set of objects it represents by an attribute, like so:

``` ruby
describe users.where(uid: 0).entries do
  it { should eq ['root'] }
  its('uids') { should eq [1234] }
  its('gids') { should eq [1234] }
end
```

This test queries **all** users to confirm that the only one with a uid of zero is the root user.

Plural InSpec resources are created by leveraging Ruby's FilterTable module to capture system data. Let's dig into how FilterTable works so that you can write your own plural resources.

### 10.1. Using FilterTable to write a Plural Resource

FilterTable is intended to help you author plural resources with **stucture data**. You declare a number of columns of data, attach them to a FilterTable object, and then write methods that the FilterTable can call to populate those columns. You can also define custom matchers that make sense for whatever data you are modeling (to go alongside the standard InSpec matchers like `be_in`,`include`, and `cmp`). You wind up with a queryable structure:

```ruby

inspec> etc_hosts.entries
=> 
[#<struct  ip_address="127.0.0.1", primary_name="localhost", all_host_names=["localhost", "localhost.localdomain", "localhost4", "localhost4.localdomain4"]>,
 #<struct  ip_address="::1", primary_name="localhost6", all_host_names=["localhost6", "localhost6.localdomain6"]>,
 #<struct  ip_address="127.0.0.1", primary_name="test1.org", all_host_names=["test1.org"]>,
 #<struct  ip_address="127.0.0.1", primary_name="test2.org", all_host_names=["test2.org"]>,
 #<struct  ip_address="127.0.0.1", primary_name="test3.org", all_host_names=["test3.org"]>,
 #<struct  ip_address="127.0.0.1", primary_name="test4.org", all_host_names=["test4.org"]>]

```

#### 10.1.1. May I have multiple FilterTable installations on a class?

In theory, yes - that would be used to implement different data fetching / caching strategies.  It is a very advanced usage, and no core resources currently do this, as far as we know.

### 10.2. FilterTable Hands-On

Let's take a look at the structure of a resource that leverages FilterTable. We will write a dummy resource that models a small group of students. Our resource will describe each student's name, grade, and the toys they have. Usually, a resource will include some methods that reach out the system under test to populate the FilterTable with real system data, but for now we're just going to hard-code in some dummy data.

* Create new profile
```
inspec init profile filtertable-test
```
* Place following file as custom resource in `libraries` directory as `filter.rb`.
:::tip
You can also use `inspec init resource <your-resource-name>` to create the template for your resource. When following the prompts, you can choose "plural" to create the template for a plural resource.
:::

```ruby
require 'inspec/utils/filter'

class Filtertable < Inspec.resource(1)

    name "filtertable"
    supports platform: "linux"

    filter_table = FilterTable.create

    filter_table.register_column(:name, field: :name)
    filter_table.register_column(:grade, field: :grade)
    filter_table.register_column(:toys, field: :toys)

    filter_table.register_custom_matcher(:has_bike?) { |filter_table| filter_table.toys.flatten.include?('bike') }
    filter_table.register_custom_matcher(:has_middle_schooler?) { |filter_table| filter_table.grade.uniq.any?{ |grade| grade >= 6} }
    
    filter_table.register_custom_property(:bike_count) { |filter_table| filter_table.toys.flatten.include?('bike').count }
    filter_table.register_custom_property(:middle_schooler_count) { |filter_table| filter_table.where{ grade >= 6 }.count }

    filter_table.install_filter_methods_on_resource(self, :fetch_data)

    def fetch_data
        # This method should return an array of hashes - the raw data.  We'll hardcode it here.
        [
          { name: "Sarah", grade: 7, toys: ['car','train','bike']},
          { name: "John",  grade: 4,  toys: ['top','bike']},
          { name: "Donny", grade: 5,  toys: ['train','nintento']},
          { name: "Susan", grade: 7, toys: ['car','gameboy','bike']},
        ]
    end
end
```
Now we've got a nice blob of code in a resource file. Let's load this resource in the InSpec shell and see what we can do with it.

#### 10.2.1. Run the InSpec shell with a custom resource

Invoking the InSpec shell with `inspec shell` will give you access to all the core InSpec resources by default, but InSpec does not automatically know about your locally defined resources unless you point them out. If you're testing a local resource, use the `--depends` flag and pass in the profile directory that your resource lives in.

```
inspec shell --depends /path/to/profile/root/
```

#### 10.2.2. Fetching Data

FilterTables organize their data into columns. Your resource will declare a number of columns using the `register_column` method.

Once you declare the columns that you want in your FilterTable (`name`, `grade`, and `toys` in our example), you need to insert some data into them using  the `install_filter_methods_on_resource` method. That method takes two args -- `self` and a data structure that is an array of hashes. The array of hashes will be matched up to the columns you defined using the hashes' keys. For our example we hard-coded this data structure, which is returned by the `fetch_data` method.

As we mentioned earlier, a real InSpec resource will include methods that will populate the resource with real system data. Take a look at the [Firewalld resource](https://github.com/inspec/inspec/blob/63a5fd26a6925b1570ee80e2953d259b58c3012e/lib/inspec/resources/firewalld.rb) for an example of a resource that does this -- note the resource is ultimately invoking a shell command (`firewall-ctl`) to populate its FilterTable. There are plenty of other InSpec resources using FilterTable that you can find in the source code if you are interested in more examples.

#### 10.2.3. Custom Matcher Examples

After we define our FilterTable's columns, we can also define custom matchers just like we do in singluar resources using `register_custom_matcher`. That function takes a block as an argument that defines a boolean expression that tells InSpec when that matcher should return `true`. Note that the matcher's logic can get pretty complicated -- that's why we're shoving all of it into a resource so we can avoid having to write complicated tests.

- `has_bike?`
```ruby
describe filtertable.where( name: "Donny" ) do
  it { should have_bike }
end  

Profile: inspec-shell
Version: (not specified)

  filtertable with name == "Donny"
     ×  should have bike
     expected #has_bike? to return true, got false

Test Summary: 0 successful, 1 failure, 0 skipped
```
```ruby
describe filtertable.where( name: "Sarah" ) do
  it { should have_bike }  
end  

Profile: inspec-shell
Version: (not specified)

  filtertable with name == "Sarah"
     ✔  should have bike

Test Summary: 1 successful, 0 failures, 0 skipped

```
In the simplest examples, we filter the table down to a single student using `where` (more on `where` in a minute) and invoke a matcher that checks if that student has a `bike` in their list of toys. We can write matchers to have whatever logic we like. For example, while `has_bike` checks if _all_ of the students in the table under test have a bike, while `has_middle_schooler` checks if _any_ student in the table under test is in the 7th grade or higher.

- `has_middle_schooler?`
```ruby
describe filtertable.where { name =~ /Sarah|John/ } do
  it { should have_middle_schooler }
end

Profile:   inspec-shell
Version:   (not specified)
Target ID: 

  filtertable with name =~ /Sarah|John/
     ✔  is expected to have middle schooler

Test Summary: 1 successful, 0 failures, 0 skipped

```

#### 10.2.4. Custom Property

We can also declare custom properties for our resource, using whatever logic we like, just like we did for our custom matchers. Properties can be referred to with `its` syntax in an InSpec test. 

- `bike_count`
```ruby
describe filtertable do
  its('bike_count') { should eq 3 }  
end  

Profile:   inspec-shell
Version:   (not specified)
Target ID: 

  filtertable
     ✔  bike_count is expected to eq 3

Test Summary: 1 successful, 0 failures, 0 skipped
```
- `middle_schooler_count`
```ruby
describe filtertable do
   its('middle_schooler_count') { should eq 4 }     
end  

Profile:   inspec-shell
Version:   (not specified)
Target ID: 

  filtertable
     ×  middle_schooler_count is expected to eq 4
     
     expected: 4
          got: 2
     
     (compared using ==)


Test Summary: 0 successful, 1 failure, 0 skipped

```

#### 10.2.5. Suggested activity

To get a better feel for how FilterTable works, we suggest you add a few extra features to the sample given above.

- **Add a field to the data array and reflect the change in filter table**
- **Add a custom matcher**
- **Add a custom property**

Then write some tests to see how your new matchers and properties work.

### 10.3. Predefined Methods for FilterTable

When you create a new FilterTable, these methods are installed automatically: `where`, `entries`, `raw_data`, `count`, and `exist?`. Each is very useful both for writing tests in and of themselves and for creating custom matchers and properties inside the resource code.

#### 10.3.1 The `where` method

You may have already noticed that a bunch of our example tests are using the `where` method on the FilterTable object. This method returns a new FilterTable object created from the rows of the original table that match the query provided to `where`. If you have experience with relational databases, think of it like the `WHERE` clause in a SQL query. This method is extremely flexible; we give some examples below.

- If you call `where` as a method with no block and passing hash params, with keys you know are in the raw data, it will fetch the raw data, then filter row-wise and return the resulting Table.
- Multiple criteria are joined with a logical AND.
- The filtering is fancy, not just straight equality.

```ruby
  describe things.where(color: 'red') do
    its('count') { should cmp 2 }
  end

  # Regexes
  describe things.where(color: /^re/) do
    its('count') { should cmp 2 }
  end

  # It eventually falls out to '===' comparison
  # Here, range membership 1..2
  describe things.where(thing_id: (1..2)) do
    its('count') { should cmp 2 }
  end

  # irregular rows are supported
  # Only one row has the :tackiness key, with value 'very'.
  describe things.where(tackiness: 'very') do
    its('count') { should cmp 1 }
  end

```

##### 10.3.1.1. `where` method with blocks

You can also call the `where` method with a block. The block is executed row-wise. If it returns truthy, the row is included in the results. Each field declared with the `register_custom_property` configuration method is available as a data accessor.

```ruby

  # You can have any logic you want in the block
  describe things.where { true } do
    its('count') { should cmp 3 }
  end

  # You can access any fields you declared using `register_column`
  describe things.where { thing_id > 2 } do
    its('count') { should cmp 1 }
  end
```

##### 10.3.1.2. Chaining `where` calls and Tables without re-fetching raw data

The first time `where` is called, the data fetcher method is called.  `where` performs filtration on the raw data table.  It then constructs a new `FilterTable::Table`, directly passing in the filtered raw data; this is then the return value from `where`.

```ruby
  # This only calls fetch_data once
  describe things.where(color: :red).where { thing_id > 2 } do
    its('count') { should cmp 1 }
  end
```

Some other methods return a Table object, and they may be chained without a re-fetch as well.

#### 10.3.2. The `entries` method

The other `register_filter_method` call enables a pre-defined method, `entries`.  `entries` is much simpler than `where` - in fact, its behavior is unrelated.  It returns an encapsulated version of the raw data - a plain array, containing Structs as row-entries.  Each struct has an attribute for each time you called `register_column`.

Importantly, note that the return value of `entries` is not the resource, nor the Table - in other words, you cannot chain it. However, you can call `entries` on any Table.

If you call `entries` without chaining it after `where`, calling entries will trigger the call to the data fetching method.

```ruby

  # Access the entries array
  describe things.entries do
    # This is Array#count, not the resource's `count` method
    its('count') { should cmp 3}
  end

  # Access the entries array after chaining off of where
  describe things.where(color: :red).entries do
    # This is Array#count, not the resource's or table's `count` method
    its('count') { should cmp 2}
  end

  # You can access the struct elements as a method, as a hash keyed on symbol, or as a hash keyed on string
  describe things.entries.first.color do
    it { should cmp :red }
  end
  describe things.entries.first[:color] do
    it { should cmp :red }
  end
  describe things.entries.first['color'] do
    it { should cmp :red }
  end
```

#### 10.3.3. The `exist?` matcher

This `register_custom_matcher` call:
```ruby
filter_table_config.register_custom_matcher(:exist?) { |filter_table| !filter_table.entries.empty? }
```

causes a new method to be defined on both the resource class and the Table class.  The body of the method is taken from the block that is provided.  When the method it called, it will receive the `FilterTable::Table` instance as its first parameter.  (It may also accept a second param, but that doesn't make sense for this method - see thing_ids).

As when you are implementing matchers on a singular resource, the only thing that distinguishes this as a matcher is the fact that it ends in `?`.

```ruby
  # Bare call on the matcher (called as a method on the resource)
  describe things do
    it { should exist }
  end

  # Chained on where (called as a method on the Table)
  describe things.where(color: :red) do
    it { should exist }
  end
```

#### 10.3.4. The `count` property

This `register_custom_property` call:
```ruby
filter_table_config.register_custom_property(:count) { |filter_table| filter_table.entries.count }
```

causes a new method to be defined on both the resource class and the Table class.  As with `exists?`, the body is taken from the block.

```ruby
  # Bare call on the property (called as a method on the resource)
  describe things do
    its('count') { should cmp 3 }
  end

  # Chained on where (called as a method on the Table)
  describe things.where(color: :red) do
    its('count') { should cmp 2 }
  end
```

#### 10.3.5. The `raw_data` method

Unlike `entries`, which wraps each row in a Struct and omits undeclared fields, `raw_data` simply returns the actual raw data array-of-hashes.  It is not `dup`'d. People _definitely_ use this out in the wild, even though it returns a rougher data structure.

```ruby
  tacky_things = things.where(color: :blue).raw_data.select { |row| row[:tackiness] }
  tacky_things.map { |row| row[:thing_id] }.each do |thing_id|
    # Use to audit a singular Thing
    describe thing(thing_id) do
      it { should_not be_paisley }
    end
  end
```

### 10.4 FilterTable Examples

FilterTable is a very flexible and powerful class that works well when designing plural resources. As always, if you need to write a plural resource, we encourage you to examine existing resources in the InSpec source code to see how other developers have implemented it. Some good examples include:
 - [FirewallD](https://github.com/inspec/inspec/blob/63a5fd26a6925b1570ee80e2953d259b58c3012e/lib/inspec/resources/firewalld.rb)
 - [Users](https://github.com/inspec/inspec/blob/63a5fd26a6925b1570ee80e2953d259b58c3012e/lib/inspec/resources/users.rb)
 - [Shadow](https://github.com/inspec/inspec/blob/63a5fd26a6925b1570ee80e2953d259b58c3012e/lib/inspec/resources/shadow.rb)
