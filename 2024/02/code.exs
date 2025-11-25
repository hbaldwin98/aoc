Code.require_file("shared.exs", "../")

defmodule Part1 do
  def is_safe_report(input) do
    # All levels are increase or decreased by 1 - 3
    # Stagnation or larger increments are unsafe.
    # A level cannot increase and then decrease (vice-versa)
    # sliding window - we need the previous context and the current two
    # we short-circuit if we are unsafe, otherwise sliiiiiiiidddeee

    chunks =
      Enum.chunk_every(input, 3, 1, :discard)

    Enum.reduce_while(chunks, true, fn chunk, acc ->
      if !is_chunk_safe(chunk) do
        {:halt, false}
      else
        {:cont, acc}
      end
    end)
  end

  # This is not the way but it worked....
  def is_chunk_safe(chunk) do
    first = Enum.at(chunk, 0)
    second = Enum.at(chunk, 1)
    third = Enum.at(chunk, 2)

    cond do
      # Stagnation unsafe.
      first === second || first === third || second === third ->
        false

      # A level cannot increase and then decrease (vice-versa)
      first < second && second > third ->
        false

      # A level cannot increase and then decrease (vice-versa)
      first > second && second < third ->
        false

      # All levels are increase or decreased by 1 - 3
      # Stagnation or larger increments are unsafe.
      first < second && second < third && (abs(first - second) > 3 || abs(second - third) > 3) ->
        false

      # All levels are increase or decreased by 1 - 3
      # Larger increments are unsafe.
      first > second && second > third && (abs(first - second) > 3 || abs(second - third) > 3) ->
        false

      true ->
        true
    end
  end
end

defmodule Part2 do
  def is_safe_report(input) do
    # Same rules except...
    # We can tolerate a single failure
    # Can we assume that if all chunks except one are valid (true)
    # then we can tolerate it? NO WE CANNOT

    chunks =
      Enum.chunk_every(input, 3, 1, :discard)

    is_safe =
      Enum.reduce_while(chunks, true, fn chunk, acc ->
        if !is_chunk_safe(chunk) do
          {:halt, false}
        else
          {:cont, acc}
        end
      end)

    if !is_safe do
      # determine which value is unsafe
      # then remove it and chunk again.
      num_safe =
        Enum.reduce(chunks, 0, fn chunk, acc ->
          if Part1.is_chunk_safe(chunk) do
            nil
          else
            # if it's not safe, we would need to see
            # which one is not safe, then create new chunks
            # without that value and do it again.
            # should we accumulate all the safe ones
            # and then the unsafe ones
            # and then act only on the unsafe ones?
          end
        end)

      num_safe === Enum.count(chunks) || num_safe === Enum.count(chunks) - 1
    end

    is_safe
  end
end

# input = "7 6 4 2 1
# 1 2 7 8 9
# 9 7 6 2 1
# 1 3 2 4 5
# 8 6 4 4 1
# 1 3 6 7 9"

case File.read("puzzle.input") do
  {:ok, content} ->
    IO.puts("***** Part 1 *****")

    Lists.split_lines_into_groups_by_spaces(content)
    |> Enum.map(&Lists.to_integers/1)
    |> Enum.map(&Part1.is_safe_report/1)
    |> Enum.filter(fn element -> element === true end)
    |> Enum.count()
    |> IO.inspect()

    IO.puts("***** Part 2 *****")

    Lists.split_lines_into_groups_by_spaces(content)
    |> Enum.map(&Lists.to_integers/1)
    |> Enum.map(&Part2.is_safe_report/1)
    |> Enum.filter(fn element -> element === true end)
    |> Enum.count()
    |> IO.inspect()

  {:error, reason} ->
    IO.puts("Error reading file: #{reason}")
end
