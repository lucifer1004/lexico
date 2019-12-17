defmodule Api.Content do
  alias Api.{Repo, Content.Item}
  import Ecto.Query, only: [from: 2]

  def get_item_count(args) do
    query =
      from(item in Item,
        where: ilike(item.word, ^"%#{args.word}%")
      )

    Repo.aggregate(query, :count, :id)
  end

  def get_all_items(args) do
    IO.inspect(args)

    order =
      if args.desc do
        [desc: :inserted_at]
      else
        [asc: :inserted_at]
      end

    offset = (args.page - 1) * args.page_size + args.offset

    query =
      from(item in Item,
        limit: ^args.page_size,
        offset: ^offset,
        order_by: ^order,
        where: ilike(item.word, ^"%#{args.word}%")
      )

    Repo.all(query)
  end

  def create_item(args) do
    Repo.insert(%Item{word: args.word, description: args.description})
  end

  def update_item(args) do
    item = Repo.get_by!(Item, word: args.word)

    changeset =
      Ecto.Changeset.change(item,
        description: args.description,
        updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
      )

    Repo.update(changeset)
  end

  def delete_item(args) do
    item = Repo.get_by!(Item, word: args.word)
    Repo.delete(item)
  end
end
