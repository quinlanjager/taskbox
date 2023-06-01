defmodule Timebox.Server do
  use GenServer

  def start_link([]) do
    GenServer.start_link(__MODULE__, 0, name: __MODULE__)
  end

  def new(minutes) do
    {:ok, GenServer.call(__MODULE__, {:new, minutes})}
  end

  def check_ttl() do
    {:ok, GenServer.call(__MODULE__, :check_ttl)}
  end

  def time_remaining() do
    {:ok, GenServer.call(Timebox.Server, :time_remaining)}
  end

  @impl true
  def init(minutes_to_live) do
    {:ok, Timebox.Core.to_ttl(minutes_to_live)}
  end

  @impl true
  def handle_call({:new, minutes_to_live}, _, _) do
    {:reply, :ok, Timebox.Core.to_ttl(minutes_to_live)}
  end

  def handle_call(:check_ttl, _, ttl) do
    if Timebox.Core.ttl_passed?(ttl) do
      {:reply, :stop, ttl}
    else
      {:reply, :continue, ttl}
    end
  end

  def handle_call(:time_remaining, _, ttl) do
    {:reply, Timebox.Core.time_remaining(ttl), ttl}
  end
end
