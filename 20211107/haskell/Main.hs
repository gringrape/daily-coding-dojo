input01 :: [Int]
input01 = [7, 11, 
  5, 15, 
  3, 2, 
  -2, 2, 1,
  5, -6]

solve :: [Int] -> [Int]
solve (s:t:a:b:m:_:rest) = [apples, oranges]
  where apples = length $ filter (\x -> x >= s && x <= t) $ map (\x -> x + a) $ take m $ rest
        oranges = length $ filter (\x -> x >= s && x <= t) $ map (\x -> x + b) $ drop m $ rest

main = interact $ unlines . map show . solve . map read . words
