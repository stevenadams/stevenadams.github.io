---
layout: post-single
title: 'Utility classes and responsiveness'
published: true
category: css
categories:
tags:
#thumb: /assets/articles/file.jpg
thumb: https://ununsplash.imgix.net/photo-1422479516648-9b1f0b6e8da8?dpr=2&fit=crop&fm=jpg&h=725&q=75&w=1050
---

A lot of the work I have been doing recently has been geared towards more efficient CSS. In doing this I have been following closely with a lot of the principals that Harry Roberts ([@csswizadry](http://twitter.com/csswizadry)) has been writing about recently. One of the biggest improvements has come from the use of utility classes. Simple classes typically contain one declaration. A class such as `u-space-r2` for example will add a margin to the right (r) of the button of 16px (2 x vertical rhythm spacing of 8px). The problem I found was with a class like this applied to a button, for instance, would mean the button will always have a margin-right of 16px. I needed a way to apply a utility class but have the option to change it at different breakpoints.

I could do something similar to the current way I was handling grid items at breakpoints by prefixing the breakpoint name to the width class - `xl-1-4 s-half` (or `s-2-4`). This wouldn't really work because I already have the "u" prefix which determines the type of class and where to find it in the sass folder structure. I would end up with `.xl-u-space-r2`.

A few weeks back I had the opportunity of meeting up with Harry, while he was in Belfast on business. I didn't want all conversation to be based around what we do all day every day, but I couldn't resist picking his brain on my problem with utility classes and responsiveness. The solution that Harry suggested was to use modifier suffixes for the breakpoints instead of prefixing them to the start of the selector string. After all that's what we want to do, modify the spacing class at various breakpoints. So we end up with `.u-space-r2--@xl` an @ symbol being the most self explanatory symbol to use.

The generation of these classes is relatively easy using Sass

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

Now we can add these modifier selectors to elements allowing us to dictate the value of certain attributes at different breakpoints. This is most useful when used with utility selectors that generally only have one attribute.

I have updated my width classes to have the same naming convention and it works really well.

	<div class="o-grid__item u-width-1/4--@xl"></div>

Hat tip to Harry for more of his genius. If you're into CSS nerd stuff you should definitely check out [his blog](http://csswizardry.com/#section:articles), and/or [CSS Guidelines](http://cssguidelin.es/).
