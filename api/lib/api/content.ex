defmodule Api.Content do
  alias Api.{Repo, Content.Item}
  import Ecto.Query, only: [from: 2]

  def get_item_count(args) do
    query =
      from(item in Item,
        where: ilike(item.word, ^"%#{args.word}%")
      )

    {:ok, Repo.aggregate(query, :count, :id)}
  end

  def get_all_items(args) do
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

    {:ok, Repo.all(query)}
  end

  def create_item(args) do
    result =
      Item.changeset(%Item{}, %{word: args.word, description: args.description})
      |> Repo.insert()

    case result do
      {:ok, _} ->
        result

      {:error, changeset} ->
        handle_changeset_error(changeset)
    end
  end

  def update_item(args) do
    item = Repo.get_by(Item, word: args.word)

    case item do
      nil ->
        {:error, "\"#{args.word}\" cannot be found in the dictionary."}

      _ ->
        result =
          Item.changeset(
            item,
            %{
              description: args.description,
              updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
            }
          )
          |> Repo.update()

        case result do
          {:ok, _} ->
            result

          {:error, changeset} ->
            handle_changeset_error(changeset)
        end
    end
  end

  def delete_item(args) do
    item = Repo.get_by(Item, word: args.word)

    case item do
      nil -> {:error, "\"#{args.word}\" cannot be found in the dictionary."}
      _ -> Repo.delete(item)
    end
  end

  defp handle_changeset_error(changeset) do
    word = changeset.errors[:word]

    message =
      if word != nil do
        word |> Tuple.to_list() |> List.first()
      else
        changeset.errors[:description] |> Tuple.to_list() |> List.first()
      end

    {:error, message}
  end
end
