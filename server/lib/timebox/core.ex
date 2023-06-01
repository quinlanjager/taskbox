defmodule Timebox.Core do
  def ttl_passed?(ttl) do
    case DateTime.compare(cur_time(), ttl) do
      :lt -> false
      _ -> true
    end
  end

  def time_remaining(ttl) do
    DateTime.diff(ttl, cur_time())
  end

  def to_ttl(minutes) do
    DateTime.utc_now
    |> DateTime.add(minutes, :minute)
  end

  defp cur_time() do
    DateTime.utc_now()
  end
end
