defmodule Api.Seeds do
  alias Api.{Repo, Content.Item}

  defp clear() do
    # Clear all items
    Repo.delete_all(Item)
  end

  defp generate_word(used) do
    word = Faker.Name.first_name()

    if MapSet.member?(used, word) do
      generate_word(used)
    else
      word
    end
  end

  defp add() do
    # Add fake items
    Enum.reduce(0..999, MapSet.new(), fn _x, used ->
      word = generate_word(used)
      description = Faker.Lorem.sentence()
      Repo.insert(%Item{word: word, description: description})
      MapSet.put(used, word)
    end)
  end

  def exec() do
    clear
    add
  end
end

Api.Seeds.exec()
