defmodule ApiWeb.Schema do
  use Absinthe.Schema
  import_types(ApiWeb.Schema.ContentTypes)

  alias ApiWeb.Resolvers

  query do
    @desc "Get all items"
    field :items, type: list_of(:item) do
      arg(:page, :integer, default_value: 1)
      arg(:page_size, :integer, default_value: 20)
      arg(:offset, :integer, default_value: 0)
      arg(:desc, :boolean, default_value: true)
      arg(:word, :string, default_value: "")

      resolve(&Resolvers.Content.get_all_items/3)
    end

    @desc "Get item count"
    field :item_count, type: :integer do
      arg(:word, :string, default_value: "")

      resolve(&Resolvers.Content.get_item_count/3)
    end
  end

  mutation do
    @desc "Create an item"
    field :create_item, type: :item do
      arg(:word, non_null(:string))
      arg(:description, non_null(:string))

      resolve(&Resolvers.Content.create_item/3)
    end

    @desc "Update an item"
    field :update_item, type: :item do
      arg(:word, non_null(:string))
      arg(:description, non_null(:string))

      resolve(&Resolvers.Content.update_item/3)
    end

    @desc "Delete an item"
    field :delete_item, type: :item do
      arg(:word, non_null(:string))

      resolve(&Resolvers.Content.delete_item/3)
    end
  end
end
