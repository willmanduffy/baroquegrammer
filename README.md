# Baroquegrammer

Baroquegrammer is a silly little application I made to detect faces in one image
and spit them out into another. You can find a demo of this online
[here](http://philduffy.github.io/baroquegrammer/).

## Setup your own!

### Dependencies

- npm. Find details on installing [here](https://www.npmjs.com/#getting-started)

### Step 1 - Download the codebase.

Fork (or don't I'm not your boss) the repo and git clone to your machine.

### Step 2 - Setting up the base app.

In your terminal:

```bash
npm install
open index.html
```

This should give you a working version of the application (hopefully).

### Step 3 - Image creation.

Pick you image! I would recommend the image be no wider than 1000px since I
don't do any stretching of the image in browser (this would probably affect the
image placement). In your preferred image editor (I use pixelmator but this
costs money) use the eraser tool to make a "face hole" (gross). Make a note of
how many pixels from the top and left the face is and how many pixels wide the
face is.

Save the image to `assets/images/main.png`. If you rename this (including the
extension) you'll need to update the index.html.

### Step 4 - Input the face coordinates and width.

Take the numbers you wrote down from Step 3 and input them into the constants in
`assets/js/index.js`:

```js
const PARENT_FACE_X = '157px'; // Distance of face hole from left. Gross.
const PARENT_FACE_Y = '76px' // Distance of face hole from top. Gross.
const PARENT_FACE_HEIGHT = '186px' // The height of the face hole. Gross.
const PARENT_FACE_WIDTH = 135; // The width of the face hole. Gross.
```

### Step 5 - Enjoy!

Hopefully everything is working now! If not, open an issue and let's fix it!

## Todo

- Broken in Safari. Not 100% sure why but I've also put a total of 10 seconds
  into looking into it. This is a bummer because Safari is my main browser. Will
  try to fix this soon.
- Pull out Baroquegrammer to make this a more default app called "Faceplant" to
  make it a little more generic for forking.
- Refactor out '#image-preview' and go directly from the file input to the
  displayed image. This is vestigial code from when I wasn't quite sure what I
  was doing. Not that I do now.
- Possibly move constants out to a json file so you don't need to edit the JS
  source at all.
- Maybe make a package out of this?
