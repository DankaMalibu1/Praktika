// CrosswordGrid.js

import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Button, TouchableOpacity, ScrollView } from 'react-native';

let level = 0;

const generateInitialGrid = (crosswordData) => {
    const initialGrid = Array(10).fill(0).map(() => Array(10).fill('X'));

    if (crosswordData[level] && Array.isArray(crosswordData[level])) {
        crosswordData[level].forEach(({ answer, startx, starty, orientation }) => {
            let x = startx - 1;
            let y = starty - 1;

            if (x >= 0 && x < 10 && y >= 0 && y < 10) {
                for (let i = 0; i < answer.length; i++) {
                    if (orientation === 'across' && initialGrid[y] && initialGrid[y][x + i] !== undefined) {
                        initialGrid[y][x + i] = '';
                    } else if (orientation === 'down' && initialGrid[y + i] && initialGrid[y + i][x] !== undefined) {
                        initialGrid[y + i][x] = '';
                    }
                }
            } else {
                console.error(`Invalid start position (${startx}, ${starty}) for word "${answer}"`);
            }
        });
    } else {
        console.error(`Invalid crosswordData structure at level ${level}`);
    }

    return initialGrid;
};

const generateAnswerGrid = (crosswordData) => {
    const answerGrid = Array(10).fill(0).map(() => Array(10).fill('X'));

    if (crosswordData[level] && Array.isArray(crosswordData[level])) {
        crosswordData[level].forEach(({ answer, startx, starty, orientation }) => {
            let x = startx - 1;
            let y = starty - 1;

            if (x >= 0 && x < 10 && y >= 0 && y < 10) {
                for (let i = 0; i < answer.length; i++) {
                    if (orientation === 'across' && answerGrid[y] && answerGrid[y][x + i] !== undefined) {
                        answerGrid[y][x + i] = answer[i];
                    } else if (orientation === 'down' && answerGrid[y + i] && answerGrid[y + i][x] !== undefined) {
                        answerGrid[y + i][x] = answer[i];
                    }
                }
            } else {
                console.error(`Invalid start position (${startx}, ${starty}) for word "${answer}"`);
            }
        });
    } else {
        console.error(`Invalid crosswordData structure at level ${level}`);
    }

    return answerGrid;
};

const CrosswordGrid = ({ crosswordData }) => {
    const [grid, setGrid] = useState(generateInitialGrid(crosswordData));
    const [questions, setQuestions] = useState({ across: [], down: [] });
    const [showQuestions, setShowQuestions] = useState(false);

    useEffect(() => {
        setGrid(generateInitialGrid(crosswordData));
        setQuestions(generateQuestions(crosswordData));
    }, [crosswordData, level]);

    const handleInputChange = (row, col, text) => {
        const newGrid = [...grid];
        newGrid[row][col] = text.toUpperCase();
        setGrid(newGrid);
    };

    const handleGenerate = () => {
        level = (level + 1) % 2;
        setGrid(generateInitialGrid(crosswordData));
        setQuestions(generateQuestions(crosswordData));
    };

    const handleVerify = () => {
        const answerGrid = generateAnswerGrid(crosswordData);
        const isCorrect = JSON.stringify(grid) === JSON.stringify(answerGrid);
        if (isCorrect) {
            alert('Sveikiname! Jūsų kryžiažodis teisingas.');
        } else {
            alert('Neteisinga, bandykite dar kartą.');
        }
    };

    const handleReset = () => {
        setGrid(generateInitialGrid(crosswordData));
    };

    const handleSolve = () => {
        const answerGrid = generateAnswerGrid(crosswordData);
        setGrid(answerGrid);
    };

    const handleShowQuestions = () => {
        setShowQuestions(true);
    };

    const handleGoBack = () => {
        setShowQuestions(false);
        level = 0;
        setGrid(generateInitialGrid(crosswordData));
        setQuestions(generateQuestions(crosswordData));
    };

    const generateQuestions = (crosswordData) => {
        const questions = { across: [], down: [] };

        crosswordData[level].forEach(({ hint, orientation, position }) => {
            const questionText = `${position}. ${hint}`;
            questions[orientation].push(
                <Text key={`question-${position}`} style={styles.questionText}>
                    {questionText}
                </Text>
            );
        });

        return questions;
    };

    const renderGrid = () => (
        <View>
            {grid.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((cell, colIndex) => (
                        <View key={colIndex} style={styles.cellContainer}>
                            {crosswordData[level].map((entry) => {
                                const { startx, starty, position } = entry;
                                if (rowIndex + 1 === starty && colIndex + 1 === startx) {
                                    return (
                                        <Text key={`digit-${position}`} 
                                              style={styles.smallDigit}>
                                            {position}
                                        </Text>
                                    );
                                }
                                return null;
                            })}
                            <TextInput
                                style={[styles.cell, 
                                grid[rowIndex][colIndex] === 'X' ? styles.staticCell : null]}
                                value={cell}
                                editable={grid[rowIndex][colIndex] !== 'X'}
                                onChangeText={(text) =>
                                    handleInputChange(rowIndex, colIndex, text)
                                }
                                maxLength={1}
                            />
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
    
    const renderQuestions = () => (
        <View>
            <View style={styles.headingContainer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButtonContainer}>
                    <Text style={styles.backButton}>Atgal</Text>
                </TouchableOpacity>
                <Text style={styles.headingText}>Horizontaliai</Text>
            </View>
            <View style={styles.questionsContainer}>
                {questions.across.map((question, index) => (
                    <View key={`across-question-container-${index}`}>
                        {question}
                    </View>
                ))}
            </View>
            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>Vertikaliai</Text>
            </View>
            <View style={styles.questionsContainer}>
                {questions.down.map((question, index) => (
                    <View key={`down-question-container-${index}`}>
                        {question}
                    </View>
                ))}
            </View>
        </View>
    );
    
    const renderQuestionsModal = () => (
        <View style={styles.modalContainer}>
            <ScrollView>
                {renderQuestions()}
            </ScrollView>
        </View>
    );
    
    const renderQuestionsButton = () => (
        <TouchableOpacity onPress={handleShowQuestions}>
            <Text style={styles.questionsButton}>Klausimai</Text>
        </TouchableOpacity>
    );
    
    return (
        <View style={styles.container}>
            {showQuestions ? (
                renderQuestionsModal()
            ) : (
                <>
                    {renderQuestionsButton()}
                    {renderGrid()}
                </>
            )}
            <View style={styles.buttonContainer}>
                <Button color={'#000000'} 
                        title="Generuoti"
                        onPress={handleGenerate} 
                        style={styles.button} />
                <View style={styles.gap} />
                <Button color={'#000000'} 
                        title="Tikrinti"
                        onPress={handleVerify} 
                        style={styles.button} />
                <View style={styles.gap} />
                <Button color={'#000000'} 
                        title="Atstatyti"
                        onPress={handleReset} 
                        style={styles.button} />
                <View style={styles.gap} />
                <Button color={'#000000'} 
                        title="Išspresti"
                        onPress={handleSolve} 
                        style={styles.button} />
                <View style={styles.gap} />
                <Button color={'#000000'} 
                        title="Meniu"
                        onPress={handleGoBack} 
                        style={styles.button} />
                <View style={styles.gap} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    row: {
        flexDirection: 'row',
    },
    cellContainer: {
        position: 'relative',
    },
    cell: {
        borderWidth: 1,
        margin: 1,
        borderColor: '#000000',
        width: 30,
        height: 30,
        textAlign: 'center',
    },
    staticCell: {
        borderColor: 'transparent',
        color: 'white',
    },
    smallDigit: {
        position: 'absolute',
        top: 2,
        left: 2,
        fontSize: 10,
        fontWeight: 'bold',
    },
    questionsContainer: {
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
    },
    questionText: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    headingContainer: {
        marginTop: 10,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        flex: 1,
    },
    backButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3498db',
        margin: 10,
    },
    backButtonContainer: {
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginHorizontal: 10,
    },
    button: {
        flex: 1,
    },
    gap: {
        width: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    questionsButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 10,
    },
});

export default CrosswordGrid;
