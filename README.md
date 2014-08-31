# Push View
A generic mobile push view layout.

## Requirements

Ruby 2.0 and more. (for windows: [http://rubyinstaller.org](http://rubyinstaller.org/))

Sass 3.3 minimum if you want to compile the stylesheet yourself.

`gem install sass`

## Structure and options

### dist/
contains the minified and ready-to-use files for production

* push-view.min.css
* push-view.min.js

### build/
contains the compiled files before minification for development and debugging. There is a sourcemap file for css.

* push-view.css
* push-view.css.map
* push-view.js

### src/
contains the source files of the project, javascript and Sass (scss) files.

# Compatibility

| Android Browsers | IOS Safari | Chrome (Android) | Firefox  | IE    |
| :--------------: | :--------: | :--------------: | :------: | :---: |
| 2.1+             | 3.2+       | 4+               | 4+       | 10    |

# Installation

This is not a registered bower component yet but it will become soon. At the moment you can install it via
bower with direct git https url:

    bower install https://github.com/baptooo/push-view.git --save

# Integration

Firstly you have to know than there is 2 different way to install "push-view".

1. Whithout prefix customization

    Simply, you will just need to inject the dist/ files into your page. There is no restriction of position into
    the page, you can add the ressources in the `<head />` as well as in the `<body />`

    ```
    <link rel="stylesheet" type="text/css" href="bower_components/push-view/dist/push-view.min.css" />
    <script src="bower_components/push-view/dist/push-view.min.js"></script>
    ```

2. With Sass file

    As you may know, there is an option in sass called :load_paths which allows you to specify path(s) that will
    be used by Sass for searching your ressources when calling the @import directive.

    So, I recommend you to use this option and add a path to your bower_components/ directory in order to @import
    the _push-view.scss file into your project instead of extracting it manually from bower.

    `sass src/myProject.scss myProject.css :load_paths bower_components/ src/mySassFiles/`
    
# Configuration

You will have to use the Sass File integration method to be able to configure the plugin as wished.

1. Sass

    There is 2 variables that you can set actually:
    
    1. $pushViewPrefix: will add the desired prefix before each css rule generated by the plugin
    
        `$pushViewPrefix: 'my-project'`
        
    example:
        
        `.my-project-container--opened`
        
    2. $pushViewMaxWidth: will set the breakpoint limit for the @media query to be effective
    (this one needs improvements, I intend to remove the @media query and let the user do it himself)
    
        `$pushViewMaxWidth: 1280px`
        
    result:
    
        ```
        @media screen and (max-width: 1024px) {
            .my-project-container--animating {
                /* ... */
            }
        }
        ```
    
2. Javascript
    
    The plugin won't do anything and be effective unless you call the "init" method at which you will give the     whole configuration as needed.

    The configuration is given into an object with multiple options:
    
    ```js
    $pushView.init({
        elt: document.querySelector('body'),
        prefix: 'my-project',
        pushState: (true || false)
    });
    ```
    
    By default:
        * elt = document.body
        * prefix = 'push',
        * pushState = false
    
    1. elt: is the HTMLElement that will be enhanced by the different css states classes of the module
    
        ```
        .my-project-container
        .my-project-container--opened
        .my-project-container--animating
        ```
    
    2. is the prefix class you've chosen
    
    3. is just to be able to use the back button of your device to close the push-view when opened. Of course,     by default it is disabled because you will may need a clean pushState for your web application.
    
# Usage

After having created your css files and initialized the plugin, it will be ready to use immediatly.
Just use the 2 methods "open" and "close" to toggle the push-view:

1. open can have an optional callback that will be called immediatly after the transition has ended

    ```js
    $pushView.open();
    
    $pushView.open(function() {
        myApp.pushView.isOpened = true;
    });
    ```
    
2. close is exactly the same as open but it will close the push-view \o/

    ```js
    $pushView.close();
    
    $pushView.close(function() {
        myApp.pushView.isOpened = false;
    });
    ```
    
Thank you for using my plugin, I hope you will enjoy it ! If you have any recommendation or question, do not hesitate I will answer them as possible.