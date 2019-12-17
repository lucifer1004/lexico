defmodule ApiWeb.Resolvers.Content do
  def get_all_items(_parent, args, _resolution) do
    {:ok, Api.Content.get_all_items(args)}
  end

  def get_item_count(_parent, args, _resolution) do
    {:ok, Api.Content.get_item_count(args)}
  end

  def create_item(_parent, args, _resolution) do
    Api.Content.create_item(args)
  end

  def update_item(_parent, args, _resolution) do
    Api.Content.update_item(args)
  end

  def delete_item(_parent, args, _resolution) do
    Api.Content.delete_item(args)
  end
end
