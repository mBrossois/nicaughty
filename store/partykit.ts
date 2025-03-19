import PartySocket from "partysocket";
import type { Room } from "~/types/connections";

export const usePartykitStore = defineStore('partykit', () => {
    const party = ref()
    const getParty = computed(() => party.value)

    function connect(name: string) {
        party.value = new PartySocket({
            host: "localhost:1999",
            room: name,
            query: async() => ({
                createRoom: getIsHost.value
            })
          });
    }

    function disconnect() {
        party.value.close()
    }
    
    const isHost = ref(false)
    const getIsHost = computed(() => isHost.value)
    function updateHost(value: boolean) {
        isHost.value = value
    }

    return { getParty, connect, disconnect, getIsHost, updateHost }
  })