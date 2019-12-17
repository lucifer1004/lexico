defmodule Api.Repo.Migrations.CreateItems do
  use Ecto.Migration

  def change do
    create table(:items) do
      add(:word, :string)
      add(:description, :string)

      timestamps()
    end

    create(unique_index(:items, [:word]))
  end
end
