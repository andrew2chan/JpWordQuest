import { useEffect, useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { EventBus } from './game/EventBus';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchGetOptions } from './helpers/fetch';

function App()
{
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    /*const queryClient = useQueryClient();

    const { data, isSuccess, isError, status } = useQuery({
        queryKey: ['options'],
        queryFn: () => fetchGetOptions('JLPT4')
    })

    console.log(status);*/

    useEffect(() => {
        /*console.log(isSuccess);
        if(isSuccess) {
            EventBus.emit("data-loaded", data);
        }*/

        const loadData = async () => {
            try {
                const data = await fetchGetOptions('JLPT4');
                EventBus.emit("data-loaded", data);
            } catch (error) {
                console.error("Error loadig data:", error);
            }
        };
    
        loadData();

        //return () => { }
    },[])

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        </div>
    )
}

export default App
