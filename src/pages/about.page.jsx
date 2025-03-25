function AboutUs() {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                About AncTree
              </h1>
              <p className="mt-5 max-w-xl mx-auto text-xl text-gray-600">
                Connecting families, preserving memories, and building legacies together.
              </p>
            </div>
          </div>
        </div>
        
        <div className="py-16 bg-white overflow-hidden flex">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Our Story
                </h2>
                <div className="mt-3 text-lg text-gray-600 space-y-4">
                  <p>
                    AncTree began with a simple mission: to make family history accessible, 
                    engaging, and meaningful for everyone. Founded in 2023, our journey started 
                    when our founder, Sarah Chen, struggled to document her own family history 
                    after the passing of her grandmother.
                  </p>
                  <p>
                    Sarah discovered that existing genealogy tools were either too complex or 
                    too basic for what modern families needed. With a background in software 
                    development and a passion for preserving family stories, she assembled a 
                    team of like-minded individuals to create something better.
                  </p>
                  <p>
                    Today, AncTree helps thousands of families around the world document their 
                    histories, share their stories, and connect across generations.
                  </p>
                </div>
              </div>
              <div className="mt-10 lg:mt-0">
                <div className="relative aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                  
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="items-center">
              <div className="lg:order-2">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Our Mission
                </h2>
                <div className="mt-3 text-lg text-gray-600 space-y-4">
                  <p>
                    At AncTree, we believe that every family has a unique story worth preserving. 
                    Our mission is to provide intuitive tools that help you document, visualize, 
                    and share your family's journey through time.
                  </p>
                  <p>
                    We are committed to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Simplicity</strong> - Creating tools that anyone can use regardless of technical ability</li>
                    <li><strong>Privacy</strong> - Ensuring your family data remains secure and under your control</li>
                    <li><strong>Connection</strong> - Facilitating meaningful connections between family members</li>
                    <li><strong>Preservation</strong> - Helping you capture stories and memories before they're lost</li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:order-1">
                <div className="relative aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Meet the Team Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Meet Our Team
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
                Passionate experts dedicated to helping you discover and preserve your family history.
              </p>
            </div>
            
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Team Member 1 */}
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center h-24 w-24 rounded-full overflow-hidden bg-gray-200 items-center">
                        <span className="text-lime-600 font-bold text-6xl">Я</span>
                    </div>
                    <h3 className="mt-4 text-xl font-medium text-gray-900">Ярослав Балан</h3>
                    <p className="text-gray-600">Front-end</p>
                    <p className="mt-3 text-gray-600 text-center">
                      Idajsdh asdasd asdasd asdasd asdasd asdasd
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center h-24 w-24 rounded-full overflow-hidden bg-gray-200 items-center">
                        <span className="text-indigo-400 font-bold text-6xl">М</span>
                    </div>
                    <h3 className="mt-4 text-xl font-medium text-gray-900">Максим Іванишен</h3>
                    <p className="text-gray-600">Back-end DevOps</p>
                    <p className="mt-3 text-gray-600 text-center">
                      Full-stack developer specializing in data visualization and interactive genealogy tools.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center h-24 w-24 rounded-full overflow-hidden bg-gray-200 items-center">
                        <span className="text-rose-400 font-bold text-6xl">Я</span>
                    </div>
                    <h3 className="mt-4 text-xl font-medium text-gray-900">Яна Рудик</h3>
                    <p className="text-gray-600">UX/UI Designer</p>
                    <p className="mt-3 text-gray-600 text-center">
                      Award-winning designer focused on creating intuitive, accessible user experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        
      </div>
    );
  }
  
  export default AboutUs;