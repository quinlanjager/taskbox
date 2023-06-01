defmodule Timebox do
  def new(minutes) do
    Timebox.Server.new(minutes)
  end

  def check_ttl() do
    Timebox.Server.check_ttl()
  end

  def time_remaining() do
    Timebox.Server.time_remaining()
  end
end
