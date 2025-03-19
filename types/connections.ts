export type Connections = Array<{isHost: boolean, id: string, name?: string}>

export type Room = {
    isConnected: boolean,
    isNameAvailable: boolean
}

export type List = Record<string, Array<ListEntry>>

export type ListEntry = {
    id: number,
    content: string
}