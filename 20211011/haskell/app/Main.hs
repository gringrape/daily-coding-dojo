module Main where

round5 :: Int -> Int
round5 x
  | x >= 38 && (m5 - x) < 3 = m5
  | otherwise               = x
  where m5 = x - x `mod` 5 + 5

main = interact $ unlines . map (show . round5 . read) . tail . words
