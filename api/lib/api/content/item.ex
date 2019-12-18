defmodule Api.Content.Item do
  use Ecto.Schema
  import Ecto.Changeset

  schema "items" do
    field(:description, :string)
    field(:word, :string)

    timestamps()
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:word, :description])
    |> validate_required([:word, :description])
    |> unique_constraint(:word,
      name: :items_word_index,
      message: "The word has already been collected."
    )
  end
end
