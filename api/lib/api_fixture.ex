defmodule ApiFixture do
  import Api.Content
  @foo %{word: "foo", description: "bar"}
  @bar %{word: "bar", description: "foo"}

  defp generate_word(used) do
    word = Faker.Name.first_name()

    if MapSet.member?(used, word) do
      generate_word(used)
    else
      word
    end
  end

  def init(:fixed) do
    create_item(@foo)
    :timer.sleep(1000)
    create_item(@bar)
  end

  def init(:random) do
    Enum.reduce(0..999, MapSet.new(), fn _x, used ->
      word = generate_word(used)
      description = Faker.Lorem.sentence()
      create_item(%{word: word, description: description})
      MapSet.put(used, word)
    end)
  end
end
