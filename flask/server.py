##Run dengan python3 <nama_file_ini>.py
##Getnya ke http://127.0.0.1:5000/trackReceipt, parameternya 'no_resi' dan 'nama_kurir'

from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from bs4 import BeautifulSoup
import flask
from flask import request, jsonify

def check_result(string):
    return string != '' and "Tunggu" not in string

class CekResiScraper:
    def __init__(self):
        opts = Options()
        opts.headless = True
        self.browser = Firefox(options=opts)

    def __del__(self):
        self.browser.close()

    def scrape(self, awb, courier):
        self.browser.get('https://cekresi.com/?noresi=' + str(awb))
        WebDriverWait(self.browser, 10).until(lambda browser: browser.find_element_by_id("selexpid").text.strip() != '')
        self.browser.execute_script('return setExp(\'' + courier + '\')')
        self.browser.execute_script('return doCheckR()')
        WebDriverWait(self.browser, 10).until(lambda browser: check_result(browser.find_element_by_id("results").text.strip()))

        if "Maaf" in self.browser.find_element_by_id("results").text.strip():
            return {}

        soup = BeautifulSoup(self.browser.page_source, 'html5lib')

        tables = soup.findAll('div',{'class':'tengah'})
        data = tables[1].findAll('td')

        awb = str(data[2])[7:-9]
        status = str(data[5])[7:-9]
        service = str(data[8])[4:-5]
        delivery_time = str(data[11])[4:-5]
        sender = str(data[14])[17:-5].split('<br/>')
        receiver = str(data[17])[17:-5].split('<br/>')
        courier_status = str(data[20])[4:-5]

        tables = soup.findAll('table',{'class':'table'})
        row = tables[1].findAll('tr')
        timeline = []
        name = []
        for i in range(len(row)):
            if i == 0:
                name = [str(item)[16:-5] for item in row[i].findAll('th')]
                continue
            entry = {}
            data = [str(item)[4:-5] for item in row[i].findAll('td')]
            for j in range(len(name)):
                entry[name[j]] = data[j]
            timeline.append(entry)

        response = {'awb':awb, 'status':status, 'service':service, 'delivery_time':delivery_time, 'sendername':sender[0], 'senderloc':sender[1],'receivername':receiver[0],'receiverloc':receiver[1],'courierstatus':courier_status, 'timeline':timeline}

        return(response)


app = flask.Flask(__name__)
app.config["DEBUG"] = True
scraper = CekResiScraper()

@app.after_request

def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  return response

@app.route('/trackReceipt', methods=['GET'])
def trackReceipt():
    hasil = dict()
    if('no_resi' in request.args and 'nama_kurir' in request.args):
        no_resi = request.args['no_resi']
        nama_kurir = request.args['nama_kurir']

        hasil = scraper.scrape(no_resi, nama_kurir)
    
    return jsonify(hasil)

app.run()