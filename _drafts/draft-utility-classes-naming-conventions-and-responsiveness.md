# Utility classes, naming conventions, and responsiveness

This is my first blog post so you'll forgive me if it's all over the place. Ever since I got into front-end I've been meaning to start a blog. Not so much a case of "guys my opinion is gold, y'all are doing it wrong" as it is "here is something I thought was cool, if you didn't know now you know".

It wasn't until I met up with Harry ([@csswizadry](http://twitter.com/csswizadry)), while he was in Belfast for work, and he basically said "If they don't find it useful or already knew it, they're no worse off. If they didn't, you might have changed the way they work or solved a problem for them". 

I've been following Harry's work now for around a year and a half, right around the time he left sky. So while I didn't want all conversation to be based around what we do all day every day I couldn't resist picking his brain a little about some of his workflows that I had inherited and implemented in mine. My problem that I had come across involved namespacing and how it works at responsive breakpoints. Take a look at the code below.

	<button class="c-btn u-space-r2">Button</button>

`.u-space-r2` is a utility class, or a trump class if you like, which will add a margin to the right (r) of the button of 16px (2 x vertical rhythm spacing of 8px). This is a quick and efficient was of adding some spacing. The problem however arises when I hit a breakpoint and no longer need the spacing to the right of the button. 

I could do something similar to the current way I was handling grid items at breakpoints by prefixing the breakpoint name to the width class - `.xl-1-4 .s-half` (or `.s-2-4`). This wouldn't really work because I already have the u prefix which determines the type of class and where to find it in the sass folder structure. I would end up with `.xl-u-space-r2`. 

The solution that Harry suggested was to use modifier suffixes for the breakpoints instead of prefixing them to the start of the selector string. After all that's what we want to do, modify the spacing class at various breakpoints. So we end up with `.u-space-r2--@xl` an @ symbol being the most self explanatory symbol to use.  

The generation of these classes is relatively easy using Sass.

	    @mixin media($media-query) {
        $breakpoint-found: false;

        @each $breakpoint in $breakpoints {
        	$name: nth($breakpoint, 1);
            $declaration: nth($breakpoint, 2);

            @if $media-query == $name and $declaration {
                $breakpoint-found: true;

                @media only screen and #{$declaration} {
                    @content;
                }
            }
        }
    }
    
	$breakpoints: (
    	's' '(max-width: 480px)',
    	'm' '(min-width: 481px) and (max-width: 1023px)',
    	'l' '(max-width: 1023px)',
    	'xl' '(min-width: 1024px)'
	) !default;

	$space: 8px;

	@each $break in $breakpoints{
    	$bp: nth($break, 1);

    	@include media($bp){
        	@for $i from 0 through 10{
            	.u-space-l#{$i}--\@#{$bp}{
                	margin-left: ($space * $i);
            	}
        	}
    	}
	}

Now we can add our modifier selectors to elements to dictate the value of selector attributes at different breakpoints. This is most useful when used with utility selectors the generally only have one attribute. 

I have updated my width classes to have the same naming convention and it works really well. 

	<div class="o-grid__item u-width1-4--@xl"></div>
	
I hope you agree these selector make it super easy to understand their nature. Hat tip to Harry for more of his genius. You should definitely check out his blog if you're into CSS nerd stuff. 