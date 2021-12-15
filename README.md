# AKQA AEM & React Project

## Modules

The main parts of the project are:

* **core**: Java bundle containing all core functionality like OSGi services, listeners or schedulers, as well as component-related Java code such as servlets or request filters.
* **ui.apps**: contains the /apps (and /etc) parts of the project, ie JS&CSS clientlibs, components, templates and runmode specific configs
* **ui.content**: contains sample content using the components from the ui.apps
* **ui.tests**: Java bundle containing JUnit tests that are executed server-side. This bundle is not to be deployed onto production.
* **ui.frontend**: React based front-end build source code.

## How to build

To build all the modules run in the project root directory the following command with Maven 3:

    mvn clean install

If you have a running AEM instance you can build and package the whole project and deploy into AEM with

    mvn clean install -PautoInstallSinglePackage (-Padobe-public)

### Building for AEM 6.x.x

The project has been designed for **AEM as a Cloud Service**. The project is also backward compatible with AEM **6.4.8** by adding the `classic` profile when executing a build, i.e:

    mvn clean install -PautoInstallSinglePackage -Pclassic

### Content Package & Implementation

AKQA content page has the custom akqa form component that is rendered using react in the file custom.js. The form has basic validations and the backend logic has been handled in AKQAFormServlet.java. The unit test cases are available in AKQAFormServletTest.java.

### References

This project referes the Adobe AEM Weeknd spa for the basic project structure. The custom implemenation of AKQA form is then implemented over this basic setup.
