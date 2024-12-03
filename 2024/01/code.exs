defmodule Lists do
  def split_lines_into_groups_by_spaces(input) when is_binary(input) do
    split_by_line(input) |> Enum.map(&split_by_spaces/1)
  end

  def split_by_spaces(input) when is_binary(input) do
    String.split(input, [" ", "\r"], trim: true)
  end

  def split_by_line(input) do
    String.split(input, "\n", trim: true)
  end
end

defmodule Part1 do
  def furthest_between_left_in_two_lists(input) do
    # Here we go...
    # Given a list of lists
    #   Find the n-th min on the 0th index
    #   Find the n-th min on the 1st index
    #   ........
    #   Until n === length(input)

    # Simple (expensive) solution:
    # Sort the left list and sort the right list.
    # Combine, calculate, sum.
    left = Enum.map(input, fn element -> Enum.at(element, 0) end) |> Enum.sort()
    right = Enum.map(input, fn element -> Enum.at(element, 1) end) |> Enum.sort()

    Enum.zip(left, right)
    |> Enum.map(fn {left, right} -> abs(String.to_integer(left) - String.to_integer(right)) end)
    |> Enum.sum()
  end
end

# Let's actually do some Elixir learning here...
defmodule Part2 do
  def count_and_multiply_matches(input) do
    counts =
      Enum.reduce(input, %{}, fn
        # For my sanity:
        #    Map update -> We initialize the map above with %{}
        #    We match only on a list with a second value and update the accumulator with an initial value of 1
        #    or the value, using an anonymous function, + 1
        [_, second], acc -> Map.update(acc, second, 1, &(&1 + 1))
        # this is technically unnecessary since we know the exact input
        _, acc -> acc
      end)

    # Map.get gets a value from a map (counts) by a key (first) and defaults the value to 0 if not found 
    Enum.map(input, fn [first | _] -> String.to_integer(first) * Map.get(counts, first, 0) end)
    |> Enum.sum()
  end
end

case File.read("puzzle.input") do
  {:ok, content} ->
    IO.puts("***** Part 1 *****")

    content
    |> Lists.split_lines_into_groups_by_spaces()
    |> Part1.furthest_between_left_in_two_lists()
    |> IO.inspect()

    IO.puts("***** Part 2 *****")

    content
    |> Lists.split_lines_into_groups_by_spaces()
    |> Part2.count_and_multiply_matches()
    |> IO.inspect()

  {:error, reason} ->
    IO.puts("Error reading file: #{reason}")
end
