# Backend Prep

## Creating a Virtual Environment  

First will need to create a folder for the project. The location of mine will be in `/home/Code/TornadoProject`. In this folder I will need to create a virtual environment in order to install the necessary Python packages like Tornado.  

If you are on Windows you will need to open up your CMD or Powershell and go to the directory you created that will have your project. Once you are there, you can run `python -m venv <name of virtual environment>`.  

On Mac/Linux you can run `python3 -m venv <name of virtual environment>`  

I want my virtual environment to be called `virt` so I will run `python3 -m venv virt`.  

Once created, you should see a new directory in your projects directory with the name you entered for your virtual environment. In my case, the new directory is called `virt`.  

Now to activate the virtual environment.

- Windows CMD: `virt/Scripts/activate.bat`
- Windows Powershell: `virt/Scripts/activate.ps1`
- Mac/Linux: `virt/bin/activate`

To get out of the virtual environment you can run `deactivate`.  

## Installing Tornado  

Now that we have activated our virtual environment, we can now install the Tornado package, run `pip install tornado`. This should install tornado in our virtual environment.  

[Back to Beginning](/README.md) | 
[Next: *Tornado, Hello World*](/docs/markdown/01_tornado_hello_world.md)