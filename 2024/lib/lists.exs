defmodule Lists do
  def to_integers(input) do
    Enum.map(input, fn element -> String.to_integer(element) end)
  end

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
