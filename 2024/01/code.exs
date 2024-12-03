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

case File.read("part1.input") do
  {:ok, content} ->
    content
    |> Lists.split_lines_into_groups_by_spaces()
    |> Part1.furthest_between_left_in_two_lists()
    # |> Enum.take(1)
    |> IO.inspect()

  {:error, reason} ->
    IO.puts("Error reading file: #{reason}")
end
