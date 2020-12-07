# TCX2GPX

Transform TCX files in ./assets/TCX folder to ./assets/GPX

## Why ?

With [Endomondo](https://www.endomondo.com/) stopping its activities, I exported the data and got a bunch of .TCX files.
Since I started using [FitoTrack](https://codeberg.org/jannis/FitoTrack), I needed to transform the .TCX files in .GPX as currently, FitoTrack only imports .GPX files.
[sports-alliance/sports-lib](https://github.com/sports-alliance/sports-lib) was the first lib I found that would allow me to do this quickly.

## Usage

1. Clone or download this repository.
2. Add your files to folder "./assets/TCX"
3. Run ```node main.js```
4. View your files in folder "./assets/GPX"

## Credits

[sports-alliance/sports-lib](https://github.com/sports-alliance/sports-lib)
