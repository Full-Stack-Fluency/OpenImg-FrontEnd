# **Software Requirements**


## **Vision**

**Minimum Length: 3-5 sentences**

The vision of our product is to create an app that allows users to input a text prompt that describes an image they’d like to see. The product will then communicate with OpenAI to create an image based on the text input. This image is one-of-a-kind and completely unique to the specific text prompt. These images can be saved to a user’s profile and edited later. This allows ANYONE to be an artist and saves time finding a desired image and editing it yourself. The AI engine does all the work for you. While OpenAI accounts only allow 50 free images, our site has a much higher threshold for usage limits. 


## **Scope (In/Out)**



* IN - What will your product do
    * Allows user to input text prompt to get an image
    * Allows user to save image to personal profile
    * Allows user to edit previous images and prompts
    * Allows user to delete saved images and prompts from their profile
    * Allows user to keep images private unless logged in
    * Allows user to view an About Us page to view the profiles of the app creators
* OUT - What will your product not do?
    * This product should not generate copyrighted images. 
    * This product should not generate an exact replica of artwork that is already existing.


### **Minimum Viable Product (MVP) Definition:**



* User can log in via Auth0
* User can generate image via prompt
* User can save their prompt
* User can edit their saved prompt
* User can delete their saved prompt


### **Stretch**



* User can store the URL of their image without needing to regenerate that image via the API
* User can edit their prompt by sending the pre-existing image to the edit and using the built in edit feature
* User can store their prompts on their own google drive using the Google Drive API


## **Functional Requirements**

List the functionality of your product. This will consist of tasks such as the following:



1. Minimum Viable Product (MVP) definition.
2. User can log in via Auth0
3. User can generate image via prompt
4. User can save their prompt
5. User can edit their saved prompt
6. User can delete their saved prompt


### **Data Flow**

Describe the flow of data in your application. Write out what happens from the time the user begins using the app to the time the user is done with the app. Think about the “Happy Path” of the application. Describe through visuals and text what requests are made, and what data is processed, in addition to any other details about how the user moves through the site.



1. User reaches the Home Page of Front End
2. User can read About Me's and see the login button
3. User can navigate to either edit or generate page via header nav bar
4. Generate page gives option to input prompt and once prompt returns image they have option to save (possibly either to DB or Google Drive)
5. Edit page gives option to view all saved prompts and select one to (possibly display the image) edit or delete it
