return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-2 px-4 text-black">
        <div className="max-w-[460px] w-full">
          <div className="p-2 sm:p-4 rounded mt-5 md:mt-10">
            {/* <VotersResult /> */}
            <div>
              <p className="text-center font-semibold text-xl">Enter Vote Results</p>
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div
                  className="mt-10 space-y-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <label className="w-32 font-medium">
                      Total Registered Voters:
                    </label>
                    <input
                      name="Registered Voters"
                      type="text"
                      defaultValue={fetchedResult.regVoter}
                      {...register("registeredVoters", { required: true })}
                      className="flex-1 border border-slate-500 rounded-md px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-[#5bbe1a]/50 focus:border-[#5bbe1a]"
                    />
                  </div>
                  {/*  */}
                  <div className="flex items-center gap-4">
                    <label className="w-32 font-medium">
                      Accredited Voters:
                    </label>
                    <input
                      name="Accredited Voters"
                      type="text"
                      defaultValue={fetchedResult.accredVoter}
                      {...register("accreditedVoters", { required: true })}
                      className="flex-1 border border-slate-500 rounded-md px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-[#5bbe1a]/50 focus:border-[#5bbe1a]"
                    />
                  </div>
                  {/*  */}
                  <div className="flex items-center gap-4">
                    <label className="w-32 font-medium">
                      Total Votes Cast:
                    </label>
                    <input
                      name="Total Votes Cast"
                      type="text"
                      defaultValue={fetchedResult.totalVote}
                      {...register("totalVotesCast", { required: true })}
                      className="flex-1 border border-slate-500 rounded-md px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-[#5bbe1a]/50 focus:border-[#5bbe1a]"
                    />
                  </div>
                  {/*  */}
                  <div className="flex items-center gap-4">
                    <label className="w-32 font-medium">Invalid Votes:</label>
                    <input
                      name="Invalid Votes"
                      type="text"
                      defaultValue={fetchedResult.invalidVote}
                      {...register("invalidVotes", { required: true })}
                      className="flex-1 border border-slate-500 rounded-md px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-[#5bbe1a]/50 focus:border-[#5bbe1a]"
                    />
                  </div>
                  {/*  */}
                  <div className="flex items-center gap-4">
                    <label className="w-32 font-medium">AWR:</label>
                    <input
                      name="AWR"
                      type="text"
                      defaultValue={fetchedResult.awr}
                      {...register("awr", { required: true })}
                      className="flex-1 border border-slate-500 rounded-md px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-[#5bbe1a]/50 focus:border-[#5bbe1a]"
                    />
                  </div>
                </div>

                {/* 💥💥💥 <PartyResults /> */}
                <div
                  className="mt-10 space-y-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={imgLink + party.logo1}
                      alt={acro.acro1}
                      className="w-10 h-10 object-contain mr-5"
                    />
                    <input
                      type="text"
                      placeholder={`Enter Result for ${acro.acro1}`}
                      name="party1"
                      defaultValue={fetchedResult.party1}
                      {...register("party1", { required: true })}
                      className="flex-1 border border-slate-500 rounded-md px-3 py-2 
                                 focus:outline-none focus:ring-2 focus:ring-[#5bbe1a]/50 focus:border-[#5bbe1a]"
                    />
                  </div>
                  {/*  */}
                  <div className="flex items-center gap-4">
                    <img
                      src={imgLink + party.logo2}
                      alt={acro.acro2}
                      className="w-10 h-10 object-contain mr-5"
                    />
                    <input
                      type="text"
                      placeholder={`Enter Result for ${acro.acro2}`}
                      name="party2"
                      defaultValue={fetchedResult.party2}
                      {...register("party2", { required: true })}
                      className="flex-1 border border-slate-500 rounded-md px-3 py-2 
                                 focus:outline-none focus:ring-2 focus:ring-[#5bbe1a]/50 focus:border-[#5bbe1a]"
                    />
                  </div>
                  {/*  */}
                  <div className="flex items-center gap-4">
                    <img
                      src={imgLink + party.logo3}
                      alt={acro.acro3}
                      className="w-10 h-10 object-contain mr-5"
                    />
                    <input
                      type="text"
                      placeholder={`Enter Result for ${acro.acro3}`}
                      name="party3"
                      defaultValue={fetchedResult.party3}
                      {...register("party3", { required: true })}
                      className="flex-1 border border-slate-500 rounded-md px-3 py-2 
                                 focus:outline-none focus:ring-2 focus:ring-[#5bbe1a]/50 focus:border-[#5bbe1a]"
                    />
                  </div>
                  {/*  */}
                  <div className="flex items-center gap-4">
                    <img
                      src={imgLink + party.logo4}
                      alt={acro.acro4}
                      className="w-10 h-10 object-contain mr-5"
                    />
                    <input
                      type="text"
                      placeholder={`Enter Result for ${acro.acro4}`}
                      name="party4"
                      defaultValue={fetchedResult.party4}
                      {...register("party4", { required: true })}
                      className="flex-1 border border-slate-500 rounded-md px-3 py-2 
                                 focus:outline-none focus:ring-2 focus:ring-[#5bbe1a]/50 focus:border-[#5bbe1a]"
                    />
                  </div>
                  {/*  */}
                  <div className="flex items-center gap-4">
                    <img
                      src={imgLink + party.logo5}
                      alt={acro.acro5}
                      className="w-10 h-10 object-contain mr-5"
                    />
                    <input
                      type="text"
                      placeholder={`Enter Result for ${acro.acro5}`}
                      name="party5"
                      defaultValue={fetchedResult.party5}
                      {...register("party5", { required: true })}
                      className="flex-1 border border-slate-500 rounded-md px-3 py-2 
                                 focus:outline-none focus:ring-2 focus:ring-[#5bbe1a]/50 focus:border-[#5bbe1a]"
                    />
                  </div>
                  {/*  */}
                  <div className="flex items-center gap-4">
                    <img
                      src={imgLink + party.logo6}
                      alt={acro.acro6}
                      className="w-10 h-10 object-contain mr-5"
                    />
                    <input
                      type="text"
                      placeholder={`Enter Result for ${acro.acro6}`}
                      name="party6"
                      defaultValue={fetchedResult.party6}
                      {...register("party6", { required: true })}
                      className="flex-1 border border-slate-500 rounded-md px-3 py-2 
                                 focus:outline-none focus:ring-2 focus:ring-[#5bbe1a]/50 focus:border-[#5bbe1a]"
                    />
                  </div>
                  {/*  */}
                </div>

                <div className="hidden text-center mt-8">
                  {resp}
                </div>

                <div className="mt-8 mb-20 text-center">
                  <button className="cursor-pointer px-10 py-4 bg-green-950 rounded-md text-white text-lg">Submit Result</button>
                </div>
              </form>
            </div>


          </div>
        </div>
      </div>
    </div>
  );