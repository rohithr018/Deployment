import React, { useState } from "react";
import { FaSearch, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [searchText, setSearchText] = useState("");
    const [customRepoUrl, setCustomRepoUrl] = useState("");
    const navigate = useNavigate();

    const username = "your-username"; // Replace dynamically if needed

    const repositories = [
        { id: 1, name: "awesome-project" },
        { id: 2, name: "portfolio-site" },
        { id: 3, name: "chat-app" },
        { id: 4, name: "machine-learning-notes" },
        { id: 5, name: "data-visualizer" },
        { id: 6, name: "node-api-server" },
        { id: 7, name: "blog-backend" },
    ];

    const filteredRepos = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleImportRepo = (repoName) => {
        const repoUrl = `https://github.com/${username}/${repoName}`;
        navigate("/deploy", { state: { repoUrl } });
    };

    const handleImportCustomRepo = () => {
        if (customRepoUrl.trim() !== "") {
            navigate("/deploy", { state: { repoUrl: customRepoUrl.trim() } });
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0d0d] p-6 flex items-center justify-center">
            <div className="w-full max-w-3xl bg-[#111111] rounded-3xl shadow-2xl border border-gray-800 overflow-hidden">
                <div className="p-10 text-white flex flex-col gap-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-2">New Deployment</h2>
                        <p className="text-sm text-gray-400">Select a repository to import</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-2/3 flex justify-center items-center gap-2">
                            <FaGithub size={24} className="text-gray-400" />
                            <div>
                                <span className="text-sm text-gray-500">github/</span>
                                <span className="font-semibold text-2xl ml-2 text-white">{username}</span>
                            </div>
                        </div>

                        <div className="flex-1/3 relative">
                            <input
                                type="text"
                                placeholder="Search repositories..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full px-10 py-3 rounded-lg bg-[#1a1a1a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-semibold">Import existing repo</span>
                    </div>

                    <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4">
                        <div className="h-[300px] overflow-y-auto pr-1">
                            {filteredRepos.length > 0 ? (
                                <div className="divide-y divide-gray-700">
                                    {filteredRepos.map((repo) => (
                                        <div
                                            key={repo.id}
                                            className="flex justify-between items-center px-2 py-3 hover:bg-[#222] transition"
                                        >
                                            <div className="text-white font-medium text-sm truncate">{repo.name}</div>
                                            <button
                                                onClick={() => handleImportRepo(repo.name)}
                                                className="bg-white text-black font-medium px-3 py-1.5 text-sm rounded-md hover:bg-gray-400 transition"
                                            >
                                                Import
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-500 text-sm">
                                    No match found
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 my-2">
                        <hr className="flex-grow border-gray-700" />
                        <span className="text-gray-500 text-sm font-semibold">OR</span>
                        <hr className="flex-grow border-gray-700" />
                    </div>

                    <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-semibold">Deploy from GitHub URL</span>
                    </div>

                    <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="https://github.com/username/repo-name"
                                value={customRepoUrl}
                                onChange={(e) => setCustomRepoUrl(e.target.value)}
                                className="flex-1 px-3 py-2 rounded-md bg-[#111111] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition text-sm"
                            />
                            <button
                                onClick={handleImportCustomRepo}
                                className="bg-white text-black font-medium px-3 py-1.5 text-sm rounded-md hover:bg-gray-400 transition"
                            >
                                Import
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
