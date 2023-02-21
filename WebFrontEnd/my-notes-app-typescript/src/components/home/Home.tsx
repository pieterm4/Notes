import FolderContainer from '../../features/folders/FolderContainer';
import { Header } from '../header/Header';
import { Toggable } from '../toggable/Toggable';
import './Home.css';
import '../toggable/Toggable.css';
import React from 'react';
import NotesContainer from '../../features/notes/NotesContainer';

export const Home = (): JSX.Element => {
    return (
        <div className="homeContainer">
            <header className="page-header">
                <Header />
            </header>

            <main className="page-content">
                <div className="foldersContainer">
                    <div className="toggable-folders">
                        <Toggable title="Folders" show={true}>
                            <FolderContainer />
                        </Toggable>
                    </div>
                    <div className="non-toggable-folders">
                        <FolderContainer />
                    </div>
                </div>
                <div className="notesContainer">
                    <NotesContainer />
                </div>
            </main>

            <footer className="page-footer">
                <h1>Copyright &copy; Piotr Makowiec</h1>
            </footer>
        </div>
    );
};
