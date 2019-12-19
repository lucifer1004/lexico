defmodule Api.ContentTest do
  use Api.DataCase, async: true
  alias Api.Content.Item
  import Api.Content

  describe "[items]" do
    @valid_args %{word: "foo", description: "bar"}
    @invalid_word_args %{word: nil, description: nil}
    @invalid_description_args %{
      word: "foo",
      description: nil
    }
    @update_args %{
      word: "foo",
      description: "barbar"
    }

    test "get item count" do
      ApiFixture.init(:random)
      assert {:ok, count} = get_item_count(%{word: ""})
      assert count == 1000
    end

    test "get item count with filter" do
      ApiFixture.init(:fixed)
      assert {:ok, count} = get_item_count(%{word: "foo"})
      assert count == 1
    end

    test "get all items in descending order" do
      ApiFixture.init(:fixed)

      assert {:ok, results} =
               get_all_items(%{
                 word: "",
                 desc: true,
                 page: 1,
                 page_size: 10,
                 offset: 0
               })

      assert results |> length() == 2
      assert [first, second] = results
      assert first.word == "bar"
      assert second.word == "foo"
    end

    test "get all items in ascending order" do
      ApiFixture.init(:fixed)

      assert {:ok, results} =
               get_all_items(%{
                 word: "",
                 desc: false,
                 page: 1,
                 page_size: 10,
                 offset: 0
               })

      assert results |> length() == 2
      assert [first, second] = results
      assert first.word == "foo"
      assert second.word == "bar"
    end

    test "get all items with filter" do
      ApiFixture.init(:fixed)

      assert {:ok, results} =
               get_all_items(%{
                 word: "foo",
                 desc: true,
                 page: 1,
                 page_size: 10,
                 offset: 0
               })

      assert results |> length() == 1
      assert [first] = results
      assert first.word == "foo"
    end

    test "create an item with valid data" do
      assert {:ok, %Item{} = item} = create_item(@valid_args)
      assert item.word == "foo"
      assert item.description == "bar"
    end

    test "try to create an item with invalid word" do
      assert {:error, message} = create_item(@invalid_word_args)
      assert message == "An item must have a non-null word."
    end

    test "try to create an item with invalid description" do
      assert {:error, message} = create_item(@invalid_description_args)
      assert message == "An item must have a non-null description."
    end

    test "try to create a duplicate item" do
      create_item(@valid_args)
      assert {:error, message} = create_item(@valid_args)
      assert message == "The word has already been collected."
    end

    test "update an item with valid data" do
      create_item(@valid_args)
      assert {:ok, %Item{} = item} = update_item(@update_args)
      assert item.word == "foo"
      assert item.description == "barbar"
    end

    test "try to update a non-exisitng item" do
      assert {:error, message} = update_item(@update_args)
      assert message == "\"foo\" cannot be found in the dictionary."
    end

    test "try to update an item with invalid data" do
      create_item(@valid_args)
      assert {:error, message} = update_item(@invalid_description_args)
      assert message == "An item must have a non-null description."
    end

    test "delete an item" do
      create_item(@valid_args)
      assert {:ok, deleted} = delete_item(%{word: "foo"})
      assert deleted.word == "foo"
    end

    test "try to delete a non-existing item" do
      assert {:error, message} = delete_item(%{word: "foo"})
      assert message == "\"foo\" cannot be found in the dictionary."
    end
  end
end
