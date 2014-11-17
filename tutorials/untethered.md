extends layout

block content
  .row
    .large-12.columns.fre-container
      h1 Running Tessel from a Battery
      p Tessel can be unplugged from your computer and powered from alternative power sources, like a USB battery.
      
      h2 Deploying Code to Tessel
      p While Tessel is connected to the computer, you can push code into Tessel's Flash memory with the following command:
      cli
        code tessel push script.js
      p (Try it with blinky.js from <a href="http://start.tessel.io/blinky">here</a> if you just want to test it out.)
      p Once the push command completes, you can disconnect Tessel from your computer and connect it to a different power source.

      h2 Powering Tessel
      p For the simplest power solution, all you need is a USB charger of some kind:
      ul.small-block-grid-3
        li
          img(src="https://s3.amazonaws.com/technicalmachine-assets/doc+pictures/tessel-battery.jpg")
          i USB battery
        li
          img(src="https://s3.amazonaws.com/technicalmachine-assets/doc+pictures/tessel-plug.jpg")
          i USB wall adapter
      p (There are various other ways to power your Tessel as well. You can read about them <a href="https://tessel.io/docs/power">here</a>.)
      
      p Plug in your Tessel to power.
      p Tessel will boot up and immediately start running your code!
      
      p
        i Make something cool? Show it off on the <a href="//projects.tessel.io">Projects Page</a>!
