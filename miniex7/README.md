# [Maze of Progress](https://magnusjmj.github.io/APME/miniex7/)
![screenshot](https://github.com/MagnusJMJ/APME/blob/master/miniex7/mazeofprogress.png)
---
### What is it?
It's a program that creates a randomly generated maze made of HTML objects (namely, progress bars). You can click individual progress bars with the mouse to change their rotation,
and change the maze to your liking. You can also press the space-bar to generate an entirely new maze.

**NB:** Unfortunately, clicking a progress bar only has a 50/50 chance of changing its rotation. As far as I know, this is because p5.dom overrides the native JavaScript-
function that lets you `GET` the value of an elements style attribute.

### The notion of Object-Oriented Programming and p5.dom.js
While HTML objects are still very new to me, I have experimented with objects in Javascript for a few weeks now, and I find them to be incredibly useful.
Even if, in retrospect, objects haven't been the _optimal_ way to implement/organize my code, they provide a good sense of understanding and structure to
me when I read code. Also, a huge benefit of objects is that you can make classes and constructor functions that act as a blueprint, and let you have many
complex objects of one type, with many methods and properties, without having excessively long or cluttered code because of it.

p5.dom.js was a pretty mixed bag though. I have a few gripes with it, so I might as well vent and list them here:
 * many of the methods in p5.dom are very subtly reworded methods that are native to JavasScript.
    - why would you have a method called `.style(property, value)`
      when there's already `.style.property=value`?
 * Some methods (at least one that I've found) in p5.dom _override_ native methods in JavasScript.
    - the `.style`-method in native JavaScript can be used
      to set, but also _get_ property values, whereas with
      p5.dom you're just shit out of luck if you need to
      get the value of a certain objects style property.
      
That's it for now, but rest assured I will update the list if I think of any more reason why I hate p5.dom.
