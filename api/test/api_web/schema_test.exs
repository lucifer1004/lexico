defmodule ApiWeb.SchemaTest do
  use ApiWeb.ConnCase, async: true
  alias Api.Content.Item

  @data "data"
  @items "items"
  @word "word"

  defp init(context) do
    mutation = """
      mutation {
        createItem(word: "foo", description: "bar") {
          id
        }
      }
    """

    context.conn
    |> post("/api", %{query: mutation})
  end

  describe "[item resolver]" do
    test "get items", context do
      init(context)

      query = """
        {
          items(word: "") {
            word
          }
        }
      """

      res =
        context.conn
        |> post("/api", %{query: query})
        |> json_response(200)

      assert first = res[@data][@items] |> List.first()
      assert first[@word] == "foo"
    end
  end
end
