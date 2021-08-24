module Main where

import qualified MyLib (someFunc)

main :: IO ()
main = interact $ show . sum . map read . words
