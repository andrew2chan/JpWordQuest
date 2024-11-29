import { useEffect, useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { EventBus } from './game/EventBus';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchGetOptions } from './helpers/fetch';
import Options from './components/options/Options';

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

    /*useEffect(() => {
        console.log(isSuccess);
        if(isSuccess) {
            EventBus.emit("data-loaded", data);
        }

        const loadData = async () => {
            try {
                const data = await fetchGetOptions('JLPT4');
                EventBus.emit("data-loaded", data);
                //EventBus.emit("data-loaded", "test");
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
    
        loadData();

        //return () => { }
    },[phaserRef.current])*/

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <Options phaserRef={phaserRef} />
        </div>
    )
}

export default App
