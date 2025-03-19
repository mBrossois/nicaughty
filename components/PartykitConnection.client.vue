<script setup lang="ts">
import PartySocket from "partysocket";

const props = defineProps<{
  name: string
  isCreate?: boolean
}>()

const messages = ref([])

// connect to our server
const partySocket = new PartySocket({
  host: "localhost:1999",
  room: props.name
});


function disconnect() {
  partySocket.close()
}

// send a message to the server
partySocket.send("Hello everyone");

// print each incoming message from the server to console
partySocket.addEventListener("message", (e) => {
  messages.value.push(e.data)
  if(e.data === 'exists' && props.isCreate) disconnect()

});
</script>

<template>
<div>
<p v-for="message of messages" :key="message">{{ message }}</p>
</div>
</template>
