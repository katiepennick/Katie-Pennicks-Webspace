---
title: "How to blog on a static site using Obsidian and 11ty"
date: 2025-12-21
tags: [web-dev]
summary: Neocities website, now with blog!
draft: false
---
If you're reading this, I have been successful in my attempt to implement a blog publishing workflow using Obsidian and Eleventy ([11ty](https://www.11ty.dev/))!

I took a lot of inspiration from [Lost Letters](https://lostletters.neocities.org/2022/11/06/blogging) who showed that making a blog is possible with a static site generator. They use Jekyll - I'm instead using 11ty but it seems to be a similar setup.

The key bonus using [Obsidian](https://obsidian.md/) for crafting blog posts  (aside from the fact I was already low-key obsessed with it) is having a nice text editor and UI, formatting text easily without writing html, and making use of the spellchecker (very necessary for me) (I literally just mis-spelled necessary).

My site is hosted on [Neocities](https://neocities.org/), I use VS Code to edit my code, git to push my changes, and 11ty to create templates so I can make changes to my header and footer which are deployed site-wide.

Obsidian plays nicely with 11ty as they both speak yaml. I can edit my blog posts in Obsidian (setting their status to draft), then once I am ready I can set draft status to false which will prompt 11ty to build the files. I then commit changes and push using VS Code and git, and the new blog post appears on my website!

## Brief guide

Here's a very brief overview of how I configured Obsidian and 11ty to achieve this setup. Disclaimer: I used AI to assist with writing this code - I am very much a beginner and using this project to learn. I thought I'd post my steps here in case it is useful to anyone else!

### 1. Configure 11ty

- **Create a folder for posts in your repo** (mine is _posts/)

- **Create an 11ty post layout** (all my 11ty files are stored in repo/_includes)_ I called this one post.njk. In that file, write the following:

```
---
layout: layout.njk
---

<article class="post">
  <header class="post-header">
    <h1>{{ title }}</h1>

    {% if date %}
      <p class="post-meta">
        <time datetime="{{ date }}">{{ date }}</time>
      </p>
    {% endif %}
  </header>

  <div class="post-body">
    {{ content | safe }}
  </div>
</article>

```


- **Ensure you have a blog landing page with 11ty front matter**

I already had blog.html built, so I added the following yaml to the top:
```
---
layout: layout.njk
title: Blog
permalink: /blog/
---

```

And added this below:
```
<h1>Blog</h1>

<ul class="post-list">
  {% for post in collections.post | reverse %}
    <li class="post-list-item">
      <a href="{{ post.url }}">{{ post.data.title }}</a>
      {% if post.data.date %}
        <span class="post-list-date">{{ post.data.date }}</span>
      {% endif %}
    </li>
  {% endfor %}
</ul>

```

- **Make Eleventy respect drafts!**
Open up your .eleventy.js file and add in the following:
```
eleventyConfig.addGlobalData("eleventyComputed", {
  eleventyExcludeFromCollections: (data) => data.draft === true,
  permalink: (data) => (data.draft === true ? false : data.permalink),
});

```

This will ensure the blog posts you draft in Obsidian are only actually built onto your site when you change the status to draft:false.

### 2. Configure Obsidian Vault

- **Open your repo**
DON'T create a new vault in Obsidian! This tripped me up. You want to ask Obsidian to open an existing folder as a vault. In the main menu (or after clicking >manage vaults) choose the >Open folder as vault option, and select your existing repo folder. This will open the folder inside Obsidian. Obsidian will create a .obsidian folder inside the repo, but we can ask git and 11ty to ignore this in a bit. 

- **Create folders**
In Obsidian, create a new folder in your repo for posts (mine is called _posts)._ Then create another folder in repo for templates.

- **Set default locations**
Go to Settings>Files and links>Default location for new notes>In the folder specified below and type out desired path (mine is _posts)_
Then do the same for images and attachments (I already have a folder in my repo for images, so this is what I set it to).
Finally do the same for templates. Settings>Templates>Template folder location. 

- **Create template for your blog posts**
Right click Templates folder>New note. Name it something like 'Blog post template'. Ensure you're in **source mode** and then add the following front matter:
```
---
layout: post.njk
title: "{{title}}"
date: {{date}}
tags: [post]
permalink: /blog/{{slug}}/
draft: true
---

```
This means each blog post you create will automatically pull the post.njk template. Adding the post tag will ensure 11ty will read this as a blog post and treat it accordingly.

- **Optional: set hotkey to insert template**
In Settings>Hotkeys you can add custom hotkeys to Obsidian. I use Ctrl+M to insert a template, so I can easily go Ctrl+N to create a new note, followed by Ctrl+M to drop in the template!

- **Create a new blog post to test it**
In Obsidian, create a new note (it should automatically be created in your specified folder), add the blog post template, and edit the front matter. Change the title to your actual title (**keep the quotes**), change the slug to something url-friendly (no spaces), add any desired topic tags. Add in some content after the font matter.

### 3. Configure git and commit!

- **Make git ignore obsidian files** (other than your posts of course). I have a file in my repo called .gitignore, so I just added the following to that file:
```
.obsidian/
.trash/
```
The trash folder was automatically created by Obsidian, so I told git to ignore it. I then just went ahead and deleted that folder - there was nothing in it and Obsidian will recreate it again if it needs to - to keep my repo tidy.

- **Sanity check**: Once the obsidian trash is ignored, you can test how it's looking by running it locally. I do this by putting 'npm run start' into my VS code terminal. 11ty then builds the site and hosts it locally, generating a link where I can preview the site.

- **Go ahead and commit your changes.** These changes should include your new post layout, your blog index, and your first post.


## What's next?

Now I have the basic architecture and workflow in place I can move onto the fun bit - styling! I am excited to try and make something fun and creative. I would really like to make little cards for each of my posts and to have these appear on the landing page as scraps of paper. We'll see.

I hope this was useful! If I can make a blog, you certainly can!