import React, { useState, useRef } from 'react';
import { FiPlus, FiEdit, FiSave, FiTrash, FiGithub, FiGitBranch } from 'react-icons/fi';

const Deploy = () => {
    const [selectedBranch, setSelectedBranch] = useState('');
    const [envVars, setEnvVars] = useState([]);
    const dummyBranches = ['main', 'dev', 'feature/login', 'release/v1.0'];
    const dummyUsername = 'johndoe';
    const dummyRepo = 'awesome-app';
    const envVarContainerRef = useRef(null);

    const handleAddEnvVar = () => {
        setEnvVars([...envVars, { key: '', value: '', isEditing: true }]);
        scrollToBottom();
    };

    const handleEnvVarChange = (index, field, value) => {
        const updated = [...envVars];
        updated[index][field] = value;
        setEnvVars(updated);
    };

    const handleEditEnvVar = (index) => {
        const updatedEnvVars = [...envVars];
        updatedEnvVars[index].isEditing = true;
        setEnvVars(updatedEnvVars);
    };

    const handleSaveEnvVar = (index) => {
        const updatedEnvVars = [...envVars];
        updatedEnvVars[index].isEditing = false;
        setEnvVars(updatedEnvVars);
    };

    const handleRemoveEnvVar = (index) => {
        const updatedEnvVars = envVars.filter((_, i) => i !== index);
        setEnvVars(updatedEnvVars);
    };

    const scrollToBottom = () => {
        if (envVarContainerRef.current) {
            envVarContainerRef.current.scrollTo({
                top: envVarContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    const handleDeploy = () => {
        console.log('Deploying with:', {
            username: dummyUsername,
            repo: dummyRepo,
            branch: selectedBranch,
            envVars,
        });
    };

    const isAddButtonDisabled = () => {
        const lastEnvVar = envVars[envVars.length - 1];
        return lastEnvVar?.key === '' || lastEnvVar?.value === '' || lastEnvVar?.isEditing;
    };

    const isDeployDisabled = !selectedBranch || envVars.some(v => v.isEditing || !v.key || !v.value);

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl w-full">
                {/* Left Panel - Deployment Info */}
                <div className="bg-[#111] border border-gray-800 rounded-3xl p-6 shadow-2xl h-[600px] flex flex-col">
                    <h2 className="text-2xl font-bold mb-6 text-center">Deployment Details</h2>

                    {/* GitHub Info */}
                    <div className="mb-8">
                        <div className="flex items-center gap-6 text-white text-base font-medium">
                            <div className="flex items-center gap-1">
                                <FiGithub className="text-gray-400" />
                                <span className="text-gray-400">/</span>
                                <span>{dummyRepo}</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <FiGitBranch className="text-gray-400" />
                                <select
                                    value={selectedBranch}
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                    className="bg-transparent text-white focus:outline-none cursor-pointer appearance-none pr-6"
                                    style={{ WebkitAppearance: 'none' }}
                                >
                                    <option value="" disabled>Select a branch</option>
                                    {dummyBranches.map((branch, i) => (
                                        <option key={i} value={branch} className="bg-[#111] text-white">
                                            {branch}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Environment Variables */}
                    <div className="bg-[#111] border border-gray-800 rounded-xl p-6 shadow-xl flex-1">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold mb-4">Environment Variables</h3>
                            <button
                                onClick={handleAddEnvVar}
                                className={`p-2 hover:bg-gray-800 rounded-full ${isAddButtonDisabled() ? 'cursor-not-allowed' : ''}`}
                                title="Add"
                                disabled={isAddButtonDisabled()}
                            >
                                <FiPlus className="text-green-500" />
                            </button>
                        </div>
                        <div
                            ref={envVarContainerRef}
                            className="overflow-auto max-h-[200px] space-y-3 mb-4"
                        >
                            {envVars.length === 0 ? (
                                <p className="text-gray-500 text-center">No environment variables added yet.</p>
                            ) : (
                                envVars.map((envVar, index) => (
                                    <div key={index} className="flex items-center justify-between gap-3 mb-3">
                                        <div className="flex gap-3 w-full">
                                            <input
                                                type="text"
                                                placeholder="Key"
                                                value={envVar.key}
                                                onChange={(e) => handleEnvVarChange(index, 'key', e.target.value)}
                                                className="w-1/2 px-3 py-2 rounded-md bg-black border border-gray-700 text-white"
                                                disabled={!envVar.isEditing}
                                                autoFocus={envVar.isEditing}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Value"
                                                value={envVar.value}
                                                onChange={(e) => handleEnvVarChange(index, 'value', e.target.value)}
                                                className="w-1/2 px-3 py-2 rounded-md bg-black border border-gray-700 text-white"
                                                disabled={!envVar.isEditing}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {!envVar.isEditing ? (
                                                <button
                                                    onClick={() => handleEditEnvVar(index)}
                                                    className="p-2 hover:bg-gray-800 rounded-full"
                                                    title="Edit"
                                                >
                                                    <FiEdit className="text-yellow-500" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleSaveEnvVar(index)}
                                                    className="p-2 hover:bg-gray-800 rounded-full"
                                                    title="Save"
                                                    disabled={!envVar.key || !envVar.value}
                                                >
                                                    <FiSave className="text-blue-500" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleRemoveEnvVar(index)}
                                                className="p-2 hover:bg-gray-800 rounded-full"
                                                title="Remove"
                                            >
                                                <FiTrash className="text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Deploy Button */}
                    <div className="mt-5 text-center">
                        <button
                            onClick={handleDeploy}
                            disabled={isDeployDisabled}
                            className={`px-6 py-2 rounded-lg font-semibold transition ${isDeployDisabled ? 'bg-gray-700 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                                }`}
                        >
                            Deploy
                        </button>
                    </div>
                </div>

                {/* Right Panel - Build Logs */}
                <div className="bg-[#111] border border-gray-800 rounded-3xl p-6 shadow-2xl h-[600px] w-full">
                    <h2 className="text-2xl font-bold mb-4 text-center">Build Logs</h2>
                    <div className="h-[calc(100%-50px)] overflow-y-auto bg-[#111] border border-gray-700 rounded-xl p-4">
                        <div className="flex flex-col-reverse text-sm text-gray-400 space-y-1 space-y-reverse">
                            <p>[00:10] Deployment completed successfully 🎉</p>
                            <p>[00:08] Deploying to server...</p>
                            <p>[00:03] Building Docker image...</p>
                            <p>[00:01] Fetching code from GitHub repository</p>
                            <p>[00:00] Waiting for deployment to start...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Deploy;
